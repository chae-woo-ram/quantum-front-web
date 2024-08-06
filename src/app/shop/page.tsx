'use client';

import { useRouter } from 'next/navigation';
import Container from '@/components/common/Container';
import { useGetRijksMuseum } from '@/api/openApi/openApii.query';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Card, CardContent, Grid, IconButton } from '@mui/material';
import { styled } from 'styled-components';

function Shop() {
  const { data } = useGetRijksMuseum();
  const router = useRouter();

  const onClickNavigateToDetail = (objectNumber: string) => {
    if (!objectNumber) return;
    router.push(`/shop/${objectNumber}`);
  };

  return (
    <Container title={'Shop'}>
      <Grid container spacing={2}>
        {data?.artObjects?.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <ListItem onClick={() => onClickNavigateToDetail(item.objectNumber)}>
              <CardContentStyled>
                <ItemHeader>
                  <Title>{item.title}</Title>
                  <SubTitle>{item.longTitle}</SubTitle>
                </ItemHeader>
              </CardContentStyled>
              {item.webImage?.url ? (
                <ImageWrapper>
                  <Image src={item.webImage.url} alt={item.title} />
                </ImageWrapper>
              ) : (
                <NoImage>No image available</NoImage>
              )}
              <LikeButton className="like-button">
                <IconButton aria-label="like" size="small" color="secondary">
                  <FavoriteBorderIcon />
                  <FavoriteIcon />
                </IconButton>
              </LikeButton>
            </ListItem>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Shop;

const ListItem = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px;
  cursor: pointer;
  position: relative;
`;

const CardContentStyled = styled(CardContent)`
  flex-shrink: 0;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ImageWrapper}:hover & {
    transform: scale(1.1); /* 이미지 확대 효과 */
  }
`;

const NoImage = styled.div`
  width: 100%;
  height: 200px; /* 고정 높이 설정 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  border: 1px solid #ccc;
`;

const ItemHeader = styled.div`
  width: 100%;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  margin-bottom: 8px;
`;

const SubTitle = styled.div`
  font-size: 13px;
  line-height: 1.1;
  color: #777;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  margin-bottom: 8px;
`;

const LikeButton = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
`;
