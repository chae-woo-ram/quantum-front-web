import { useRouter } from 'next/navigation';
import { ellipsisTextStyle } from '@/styles/common';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Card, CardContent, Grid, IconButton } from '@mui/material';
import styled from 'styled-components';

const ListItemContent = ({ item, handleNavigateToDetail }) => {
  const router = useRouter();

  return (
    <Grid item xs={12} sm={6}>
      <ListItem onClick={() => handleNavigateToDetail(item.objectNumber)}>
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
  );
};

export default ListItemContent;

const CardContentStyled = styled(CardContent)`
  flex-shrink: 0;
`;

const ListItem = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px;
  cursor: pointer;
  position: relative;
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
  ${ellipsisTextStyle}
  margin-bottom: 8px;
`;

const SubTitle = styled.div`
  font-size: 13px;
  line-height: 1.1;
  color: #777;
  ${ellipsisTextStyle}
`;

const LikeButton = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
`;
