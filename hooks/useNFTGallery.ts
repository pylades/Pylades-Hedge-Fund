import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { getAssetsOfMultipleOwners } from '../services/openseaApi';
import { useManagerInfo } from './useManagerInfo';

export const useNFTGallery = () => {
  const { allManagerAddresses, allContractAddresses } = useManagerInfo();
  const [allAssets, setAllAssets] = useState([]);
  const [walletsInfo, setWalletsInfo] = useState({
    allManagerAddresses: [],
    allContractAddresses: [],
    loaded: false,
  });
  const [fetchInfo, setFetchInfo] = useState({
    offset: 0,
    limit: 24,
    steps: 24,
  });
  const [isLoading, setLoading] = useState(true);

  const { data: NFTList, error } = useSWR(
    walletsInfo.loaded ? ['blackpoolManagerNfts', fetchInfo.offset] : null,
    () =>
      getAssetsOfMultipleOwners(
        walletsInfo.allManagerAddresses,
        walletsInfo.allContractAddresses,
        fetchInfo.offset,
        fetchInfo.limit
      ),
    {
      onSuccess: () => {
        setLoading(false);
      },
    }
  );

  // we add another fetch to already load the next page (and cache it). Read more here: https://swr.vercel.app/docs/pagination
  useSWR(walletsInfo.loaded ? ['blackpoolManagerNfts', fetchInfo.offset + fetchInfo.steps] : null, () =>
    getAssetsOfMultipleOwners(
      walletsInfo.allManagerAddresses,
      walletsInfo.allContractAddresses,
      fetchInfo.offset + fetchInfo.steps,
      fetchInfo.limit
    )
  );

  useEffect(() => {
    loadWalletInfo();
  }, []);

  useEffect(() => {
    NFTList && setAllAssets(NFTList);
  }, [NFTList]);

  const loadWalletInfo = async () => {
    // set info to state for fetching
    setWalletsInfo({
      allManagerAddresses,
      allContractAddresses,
      loaded: true,
    });
  };

  const onNext = () => {
    const { offset, limit, steps } = fetchInfo;
    setFetchInfo({
      offset: offset + steps,
      limit,
      steps,
    });
  };

  const onPrev = () => {
    const { offset, limit, steps } = fetchInfo;
    if (offset < steps) return;
    setFetchInfo({
      offset: offset - steps,
      limit,
      steps,
    });
  };

  return {
    allAssets,
    isLoading,
    NFTList,
    fetchInfo,
    onNext,
    onPrev,
  };
};
