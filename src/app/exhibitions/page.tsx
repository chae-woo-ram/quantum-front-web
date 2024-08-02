'use client';

// lodash의 throttle 함수
import { Fragment, useEffect, useRef } from 'react';
import ListItemContent from '@/components/exhibition/ListItemContent';
import ExhibitionsSkeleton from '@/components/skeleton/ExhibitionsSkeleton';
import { useGetExhibitions } from '@/api/openApi/openApii.query';
import { Typography } from '@mui/material';
import { throttle } from 'lodash';
import styled from 'styled-components';

const Exhibition = () => {
  const appCardLayoutWrapperRef = useRef<HTMLDivElement>(null);
  const { exhibitionData, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useGetExhibitions();

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

  return (
    <Container ref={appCardLayoutWrapperRef}>
      <Typography variant="h2">Exhibition</Typography>
      <List>
        {exhibitionData?.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {page.records.map((item) => (
              <ListItemContent key={item.id} item={item} />
            ))}
          </Fragment>
        ))}
      </List>
      {(isLoading || isFetchingNextPage) && <ExhibitionsSkeleton />}
    </Container>
  );
};

export default Exhibition;

const Container = styled.div`
  width: 100%;
  padding: 60px 0 30px;
  max-width: 1024px;
  height: 100vh;
  overflow-y: auto;
`;

const List = styled.ul`
  width: 100%;
  padding-top: 50px;
`;
