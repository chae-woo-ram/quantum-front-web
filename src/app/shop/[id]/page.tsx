'use client';

import { Fragment, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { favoritesState } from '@/recoil/favorites/atom';
import Loading from '@/components/common/Loading';
import Toast from '@/components/common/Toast';
import ColorShowcase from '@/components/shop/ColorShowcase';
import Image3DViewerModal from '@/components/shop/Image3DViewerModal';
import useToast from '@/hooks/useToast';
import { useGetRijksMuseumItem } from '@/api/openApi/openApii.query';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { Box, Button, Divider, IconButton } from '@mui/material';
import { styled } from 'styled-components';

function ShopDetail({ params }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, refetch, isFetching } = useGetRijksMuseumItem(params.id);
  const [isShowModal, setIsShowModal] = useState(false);
  const [favorites, setFavorites] = useRecoilState(favoritesState);

  const { artObject } = data || {};
  const { objectNumber, webImage, longTitle, physicalMedium, subTitle, plaqueDescriptionEnglish, colors } =
    artObject || {};
  const { openToast, severity, messageToast, closeToast, showToast } = useToast();

  /** 구매문의 페이지 이동 */
  const handleNavigateToPurchaseInquiry = () => {
    const pathname = '/purchase-inquiry';
    router.push(`${pathname}?id=${params.id}`);
  };

  /**  리스트 페이지 이동 */
  const handleNavigateToList = () => {
    const scrollPosition = searchParams.get('scrollPosition') || '';
    router.push(`/shop?scrollPosition=${scrollPosition}`);
  };

  useEffect(() => {
    if (params.id) {
      refetch();
    }
  }, [params, refetch]);

  const handleFavoritesAdd = () => {
    const isAlreadyFavorite = favorites.some((favorite) => favorite.objectNumber === objectNumber);

    if (isAlreadyFavorite) {
      setFavorites((prev) => prev.filter((favorite) => favorite.objectNumber !== objectNumber));
      showToast('info', '즐겨찾기에서 제거되었습니다.');
    } else {
      setFavorites((prev) => [
        ...prev,
        {
          objectNumber,
          webImageUrl: webImage.url,
          longTitle,
          subTitle,
          physicalMedium,
        },
      ]);
      showToast('success', '작품을 즐겨찾기하였습니다.');
    }
  };
  return (
    <Container>
      {data && !isFetching ? (
        <Fragment>
          <ImageWrapper>
            <Image src={webImage?.url} alt="" />
            <IconButton onClick={handleNavigateToList}>
              <ArrowBackIosNewIcon />
            </IconButton>
          </ImageWrapper>
          <ContentsWrapper>
            <Contents>
              <Content>
                <Title>{longTitle}</Title>
                <SubTitle>
                  {physicalMedium}, {subTitle}
                </SubTitle>
                <Disc>{plaqueDescriptionEnglish}</Disc>
              </Content>
              <Divider orientation="vertical" flexItem style={{ background: '#fff' }} />
              <Content>
                {colors && colors.length > 0 && <ColorShowcase colors={colors} />}
                <Button
                  onClick={() => setIsShowModal(true)}
                  size="large"
                  fullWidth
                  variant="contained"
                  color="secondary"
                >
                  360도 이미지 보기
                </Button>
                <Box
                  sx={{
                    width: '240px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    gap: '4px',
                  }}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    endIcon={<HelpOutlineOutlinedIcon />}
                    onClick={handleNavigateToPurchaseInquiry}
                  >
                    구매문의
                  </Button>
                  <Divider orientation="vertical" flexItem style={{ background: '#fff' }} />
                  <Button
                    variant="outlined"
                    color="secondary"
                    endIcon={<ThumbUpAltOutlinedIcon />}
                    onClick={handleFavoritesAdd}
                  >
                    즐겨찾기
                  </Button>
                </Box>
              </Content>
            </Contents>
          </ContentsWrapper>
        </Fragment>
      ) : (
        <Loading />
      )}
      <Image3DViewerModal
        isShowModal={isShowModal}
        imageUrl={webImage?.url}
        handleClose={() => setIsShowModal(false)}
      />
      <Toast open={openToast} severity={severity} message={messageToast} closeToast={closeToast} />
    </Container>
  );
}

export default ShopDetail;

const ContentsWrapper = styled.div`
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 0;
  color: white;
  background-color: transparent; /* 기본 배경색을 투명으로 설정 */
  transition: background-color 0.3s ease; /* 배경색 변경 시 부드러운 전환 효과 */
`;

const Container = styled.div`
  width: 100%;
  position: relative;
  &:hover ${ContentsWrapper} {
    background-color: #000;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  && .MuiButtonBase-root {
    width: 60px;
    height: 60px;
    background-color: rgba(0, 0, 0, 0.1);
    color: #fff;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 12;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 700;
`;

const SubTitle = styled.div`
  font-size: 16px;
  color: #a2abad;
`;

const Disc = styled.div`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 8px;
`;

const Contents = styled.div`
  width: 100%;
  max-width: 1024px;
  padding: 30px;
  margin: auto;
  display: flex;
  gap: 30px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;
