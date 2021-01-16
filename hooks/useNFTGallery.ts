import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { getAssetsOfOwner } from '../services/openseaApi';
import { useManagerInfo } from './useManagerInfo';

export const useNFTGallery = () => {
  const SORT_OPTIONS = [
    { value: 'sale_price', label: 'Highest Acquisition' },
    { value: 'sale_date', label: 'Recently Acquired' },
  ];
  const { allManagerAddresses, allContractAddresses, managerOptions } = useManagerInfo();
  const [allAssets, setAllAssets] = useState([]);
  const [walletsInfo, setWalletsInfo] = useState({
    allManagerAddresses: [],
    allContractAddresses: [],
    loaded: false,
  });
  const [fetchInfo, setFetchInfo] = useState({
    selectedFilterOption: SORT_OPTIONS[0],
    selectedManagerOption: managerOptions[0],
    offset: 0,
    limit: 24,
    steps: 24,
  });
  const [isLoading, setLoading] = useState(true);

  const { data: NFTList, error } = useSWR(
    walletsInfo.loaded
      ? [`blackpool${fetchInfo.selectedManagerOption.value}Nfts`, fetchInfo.offset, fetchInfo.selectedFilterOption]
      : null,
    () =>
      getAssetsOfOwner(
        fetchInfo.selectedManagerOption.value,
        walletsInfo.allContractAddresses,
        fetchInfo.offset,
        fetchInfo.limit,
        fetchInfo.selectedFilterOption.value
      ),
    {
      onSuccess: () => {
        setLoading(false);
      },
    }
  );

  // we add another fetch to already load the next page (and cache it). Read more here: https://swr.vercel.app/docs/pagination
  useSWR(
    walletsInfo.loaded
      ? [
          `blackpool${fetchInfo.selectedManagerOption.value}Nfts`,
          fetchInfo.offset + fetchInfo.steps,
          fetchInfo.selectedFilterOption,
        ]
      : null,
    () =>
      getAssetsOfOwner(
        fetchInfo.selectedManagerOption.value,
        walletsInfo.allContractAddresses,
        fetchInfo.offset + fetchInfo.steps,
        fetchInfo.limit,
        fetchInfo.selectedFilterOption.value
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
    const { offset, limit, steps, selectedFilterOption, selectedManagerOption } = fetchInfo;
    setFetchInfo({
      selectedFilterOption,
      selectedManagerOption,
      offset: offset + steps,
      limit,
      steps,
    });
  };

  const onPrev = () => {
    const { offset, limit, steps, selectedFilterOption, selectedManagerOption } = fetchInfo;
    if (offset < steps) return;
    setFetchInfo({
      selectedFilterOption,
      selectedManagerOption,
      offset: offset - steps,
      limit,
      steps,
    });
  };

  const setSelectedOption = option => {
    const { limit, steps, selectedManagerOption, selectedFilterOption } = fetchInfo;
    if (option === selectedFilterOption) return;
    setLoading(true);
    setFetchInfo({
      selectedFilterOption: option,
      selectedManagerOption,
      offset: 0,
      limit,
      steps,
    });
  };

  const setManagerOption = option => {
    const { limit, steps, selectedFilterOption, selectedManagerOption } = fetchInfo;
    if (option === selectedManagerOption) return;
    setLoading(true);
    setFetchInfo({
      selectedFilterOption,
      selectedManagerOption: option,
      offset: 0,
      limit,
      steps,
    });
  };

  return {
    allAssets,
    isLoading,
    NFTList,
    fetchInfo,
    sortOptions: SORT_OPTIONS,
    setSelectedOption,
    managerOptions,
    setManagerOption,
    onNext,
    onPrev,
  };
};
