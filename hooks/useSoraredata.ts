import axios from 'axios';
import useSWR from 'swr';

export const useSoraredata = () => {
  const { data, error } = useSWR('/api/soraredata/blackpool', async () => await axios.get('/api/soraredata/blackpool'));

  const sorareData = (data || {}).data || {};

  return {
    sorareAUM: sorareData.sorareAUM || 0,
    sorareDataManagerArray: sorareData.sorareDataManagerArray || [],
  };
};
