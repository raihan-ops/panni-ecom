import api from '@/providers/Api';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const useGetSingleData = (url, withParams = true) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    api.getSingleData(
      { url: withParams ? `${url}/${id}` : url, setLoading },
      (response) => {
        setData(response.data);
      },
    );
  };

  return { data, loading, id, setLoading };
};

export default useGetSingleData;
