'use client';

import { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { favoritesState } from '@/recoil/favorites/atom';
import Container from '@/components/common/Container';
import { ellipsisTextStyle } from '@/styles/common';
import { Button } from '@mui/material';
import styled from 'styled-components';

const Favorites = () => {
  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const router = useRouter();

  /** 구매문의 페이지 이동 */
  const handleNavigateToDetailPage = (id: string) => {
    router.push(`/shop/${id}`);
  };

  return (
    <Container title="즐겨찾기한 작품">
      <List>
        {favorites.map(({ objectNumber, webImageUrl, longTitle, subTitle, physicalMedium }, index) => (
          <Fragment key={index}>
            <ProductInfo onClick={() => handleNavigateToDetailPage(objectNumber)}>
              <Image src={webImageUrl} alt="" />
              <Section>
                <TextWrapper>
                  <Title>{longTitle}</Title>
                  <SubTitle>
                    {physicalMedium} / {subTitle}
                  </SubTitle>
                </TextWrapper>
                <Button variant="contained" color="error">
                  삭제
                </Button>
              </Section>
            </ProductInfo>
          </Fragment>
        ))}
      </List>
      {/* {(isLoading || isFetchingNextPage) && <ExhibitionsSkeleton />} */}
    </Container>
  );
};

export default Favorites;

const List = styled.ul`
  width: 100%;
  padding-top: 50px;
`;

const ProductInfo = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  gap: 20px;
  align-items: center;
  margin-bottom: 40px;
  border: rgba(0, 0, 0, 0.23) 1px solid;
  border-radius: 5px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 150px);
`;

const TextWrapper = styled.div`
  width: 80%;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  ${ellipsisTextStyle}
`;

const SubTitle = styled.div`
  font-size: 16px;
  color: #a2abad;
  margin-top: 5px;
`;
