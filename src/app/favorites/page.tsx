'use client';

import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { favoritesState } from '@/recoil/favorites/atom';
import Container from '@/components/common/Container';
import EmptyFavorites from '@/components/favorites/EmptyFavorites';
import FavoritesList from '@/components/favorites/FavoritesList';
import { Box, Button } from '@mui/material';

const Favorites = () => {
  const [favorites, setFavorites] = useRecoilState(favoritesState);
  const router = useRouter();

  /** 구매문의 페이지 이동 */
  const handleNavigateToDetailPage = (id: string) => {
    router.push(`/shop/${id}`);
  };

  /** 즐겨찾기 전체 삭제 */
  const handleFavoritesClear = () => {
    setFavorites([]);
  };

  return (
    <Container title={`즐겨찾기한 작품 (${favorites.length})`}>
      {favorites.length > 0 ? (
        /** 즐겨찾기 목록 비어있을때 컴포넌트 */
        <>
          <FavoritesList favorites={favorites} onNavigate={handleNavigateToDetailPage} />
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <Button variant="contained" color="error" size="large" onClick={handleFavoritesClear}>
              전체삭제
            </Button>
          </Box>
        </>
      ) : (
        /** 즐겨찾기 목록 컴포넌트 */
        <EmptyFavorites onNavigate={router.push} />
      )}
    </Container>
  );
};

export default Favorites;
