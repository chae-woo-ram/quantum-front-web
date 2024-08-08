import { Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';

const EmptyFavorites = ({ onNavigate }) => {
  return (
    <Container>
      <Typography variant="h6">즐겨찾기한 작품이 없습니다.</Typography>
      <Button variant="outlined" color="info" onClick={() => onNavigate('/shop')}>
        작품 보러가기
      </Button>
    </Container>
  );
};

export default EmptyFavorites;

const Container = styled(Box)`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid #ededed;
  margin-bottom: 16px;
`;
