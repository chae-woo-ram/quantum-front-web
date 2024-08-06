'use client';

import { useGetRijksMuseumItem } from '@/api/openApi/openApii.query';
import Image3DViewerModal from '@/components/shop/Image3DViewerModal';
import { Box, Button, Divider, Stack } from '@mui/material';
import { useState } from 'react';
import { styled } from 'styled-components';

function ColorShowcase({ colors }) {
  return (
    <Stack gap={1} alignItems="center">
      <Stack direction="row" gap={0} border={1}>
        {colors?.map((item, index) => (
          <Stack alignItems="center" key={index}>
            <Box sx={{ bgcolor: item.hex, width: 40, height: 30 }} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

function ShopDetail() {
  const { data } = useGetRijksMuseumItem();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  return (
    <Container>
      {data?.artObject?.webImage?.url ? (
        <ImageWrapper>
          <Image src={data?.artObject?.webImage?.url} alt={''} />
        </ImageWrapper>
      ) : (
        <NoImage>No image available</NoImage>
      )}
      <ContentsWrapper>
        <Contents>
          <Content>
            <Title>{data?.artObject?.longTitle}</Title>
            <SubTitle>
              {data?.artObject?.physicalMedium}, {data?.artObject?.subTitle}
            </SubTitle>
            <Disc>{data?.artObject?.plaqueDescriptionEnglish}</Disc>
          </Content>
          <Divider orientation="vertical" flexItem style={{ background: '#fff' }} />
          <Content>
            <ColorShowcase colors={data?.artObject?.colors} />
            <Button onClick={() => setIsShowModal(true)} size="large" fullWidth variant="contained" color="secondary">
              360도 이미지 보기
            </Button>
          </Content>
        </Contents>
      </ContentsWrapper>
      <Image3DViewerModal
        isShowModal={isShowModal}
        imageUrl={data?.artObject?.webImage?.url}
        handleClose={() => setIsShowModal(false)}
      />
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
`;

const Image = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const NoImage = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  border: 1px solid #ccc;
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
  line-height: 1.1;
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
  gap: 10px;
`;
