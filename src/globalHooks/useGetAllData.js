
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  bindUrlWithParams,
  getAllQueryParams,
  useQuery,
} from '@/helpers/utils';
import { Button } from '@/components/shared/button';
import api from '@/providers/Api';

export const useGetAllData = (url, initialCall = true) => {
  const query = useQuery();
  const [totalPending, setTotalPending] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [summary, setSummary] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const pathName = usePathname();

  const getAllData = async (
    params,
    loadMore = false,
    callWithQuery = false,
  ) => {
    if (!params && callWithQuery) {
      params = getAllQueryParams(query);
    }

    if (loadMore) {
      params.page = currentPage + 1;
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1);
    }
    api.getAllData(
      {
        url,
        params,
        setLoading: loadMore ? setLoadingMore : setLoadingList,
      },
      (response) => {
        let _dataList = loadMore
          ? [...dataList, ...response.data?.content]
          : response.data?.content;
        setDataList(_dataList);
        setTotalElements(response.data.totalElements);
        setSummary(response.data.summary);
        setTotalPending(response.data.totalPending);
        setTotalPaid(response.data.totalPaid);
        setHasMore(response.data.totalElements > _dataList.length);

        const size = query.get('size');
        const page = query.get('page');
        if (size && page && response.data.totalElements <= (page - 1) * size) {
          router.push(
            bindUrlWithParams(pathName, {
              ...getAllQueryParams(query),
              page: page - 1,
              size: size,
            }),
          );
          setCurrentPage(currentPage - 1);
        }
      },
    );
  };

  useEffect(() => {
    if (initialCall) getAllData(getAllQueryParams(query));
  }, [query.get('page'), initialCall, url]);

  const LoadMoreButton = () => {
    return hasMore ? (
      <Button.Primary
        loading={loadingMore}
        onClick={() => {
          getAllData(getAllQueryParams(query), true);
        }}
      >
        Load More...
      </Button.Primary>
    ) : null;
  };

  return {
    dataList,
    setDataList,
    totalElements,
    loadingList,
    summary,
    getAllData,
    totalPending,
    totalPaid,
    hasMore,
    LoadMoreButton,
  };
};
