'use client';

import { Fragment, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Container from '@/components/common/Container';
import ListItemContent from '@/components/shop/ListItemContent';
import ShopSkeleton from '@/components/skeleton/ShopSkeleton';
import { useGetRijksMuseum } from '@/api/openApi/openApii.query';
import { Grid } from '@mui/material';
import { throttle } from 'lodash';
import { styled } from 'styled-components';

function Shop() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const appCardLayoutWrapperRef = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useGetRijksMuseum();

  /** 스크롤 이벤트 핸들러 */
  const handleScroll = throttle(() => {
    if (appCardLayoutWrapperRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = appCardLayoutWrapperRef.current;
      // 스크롤 위치가 컨테이너의 바닥에 가까워지면 다음 페이지 호출
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        if (!isFetchingNextPage && hasNextPage) {
          fetchNextPage();
        }
      }
    }
  }, 200); // 200ms로 스크롤 이벤트를 제한

  /** 스크롤 이벤트 리스너 */
  useEffect(() => {
    const container = appCardLayoutWrapperRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isFetchingNextPage, hasNextPage]);

  /**  상세 페이지 이동 */
  const handleNavigateToDetail = (objectNumber: string) => {
    if (!objectNumber) return;
    router.push(`/shop/${objectNumber}?scrollPosition=${appCardLayoutWrapperRef.current.scrollTop}`);
  };

  /** 리스트페이지 재진입시 스크롤 위치 복원 */
  useEffect(() => {
    const savedPosition = searchParams.get('scrollPosition');
    if (savedPosition && appCardLayoutWrapperRef.current) {
      appCardLayoutWrapperRef.current.scrollTo(0, parseFloat(savedPosition as string));
    }
  }, [searchParams]);

  return (
    <Container title={'Shop'}>
      <Contents ref={appCardLayoutWrapperRef}>
        <Grid container spacing={2}>
          {data?.map((page, pageIndex) => (
            <Fragment key={pageIndex}>
              {page.artObjects.map((item) => (
                <ListItemContent key={item.id} item={item} handleNavigateToDetail={handleNavigateToDetail} />
              ))}
            </Fragment>
          ))}
          {(isLoading || isFetchingNextPage) && <ShopSkeleton />}
        </Grid>
      </Contents>
    </Container>
  );
}

export default Shop;

const Contents = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
`;
