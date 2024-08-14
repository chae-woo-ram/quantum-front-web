import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { COMMON } from '@/reactQuery/queryKey';
import { getExhibitions, getRijksMuseum, getRijksMuseumItem } from './openApi';

/* 전시회 리스트 */
const useGetExhibitions = () => {
  const {
    data: exhibitionData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [COMMON.GET_EXHIBTIONS],
    queryFn: ({ pageParam = 1 }) => getExhibitions({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // total_page가 0이거나 현재 페이지가 마지막 페이지라면 다음 페이지 없음
      if (lastPage.info.pages <= lastPage.info.page || lastPage.info.pages === 0) {
        return undefined;
      }
      // 다음 페이지 리턴
      return allPages.length + 1;
    },
    select: (data) => data.pages,
  });
  return { exhibitionData, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage };
};

/* 이미지 리스트 */
// const useGetRijksMuseum = () => {
//   const { data, isLoading } = useQuery({
//     queryKey: [COMMON.GET_SHOP],
//     queryFn: () => getRijksMuseum(),
//   });
//   return { data, isLoading };
// };

/* shop 이미지 리스트 인피니티 쿼리 */
const useGetRijksMuseum = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [COMMON.GET_SHOP],
    queryFn: ({ pageParam = 1 }) => getRijksMuseum({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => {
      // 다음 페이지 리턴
      return allPages.length + 1;
    },
    select: (data) => data.pages,
  });
  return { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage };
};

/* 이미지 단건 */
const useGetRijksMuseumItem = (id: string) => {
  const { data, refetch, isFetching } = useQuery({
    queryKey: [COMMON.GET_SHOP_DETAIL, id],
    queryFn: () => getRijksMuseumItem(id),
    enabled: false,
  });
  return { data, refetch, isFetching };
};

export { useGetExhibitions, useGetRijksMuseum, useGetRijksMuseumItem };
