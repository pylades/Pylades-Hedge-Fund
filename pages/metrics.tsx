import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Page } from '../components';
import { getAllGames, managerObject, getAllManagerAddresses, getAllContractAddresses } from '../assets/data/managers';
import { getAssetsOfMultipleOwners } from '../services/openseaApi';
import { ALink, OpenSeaAsset } from '../components';

const Metrics = () => {
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

  const { data, error } = useSWR(
    walletsInfo.loaded ? ['allBlackpoolAssets', fetchInfo.offset] : null,
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
  useSWR(walletsInfo.loaded ? ['allBlackpoolAssets', fetchInfo.offset + fetchInfo.steps] : null, () =>
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
    data && setAllAssets(data);
  }, data);

  const loadWalletInfo = async () => {
    // get NFT wallets of all managers of all games
    const allManagerAddresses = getAllManagerAddresses();
    // get NFT contract addresses of games where Blackpool is active
    const allContractAddresses = getAllContractAddresses();
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

  return (
    <Page title='Metrics'>
      <>
        <h1>Current Games</h1>
        {getAllGames().map(game => (
          <div key={game}>
            <ALink href={managerObject[game].link} text={game.toUpperCase()} />
          </div>
        ))}
        <br />
        <h1>All Assets</h1>
        {renderPagination({ assetCount: allAssets.length, fetchInfo, onPrev, onNext })}
        {renderAssets({ isLoading, allAssets })}
      </>
    </Page>
  );
};

const renderAssets = ({ isLoading, allAssets }) => {
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <>
          {allAssets.length ? (
            <div className='grid gap-4 lg:grid-cols-6 grid-cols-4'>
              {allAssets.map(openSeaAsset => (
                <OpenSeaAsset asset={openSeaAsset} key={openSeaAsset.tokenId} />
              ))}
            </div>
          ) : (
            <p>Coming Soon</p>
          )}
        </>
      )}
    </>
  );
};

const renderPagination = ({ assetCount, fetchInfo, onPrev, onNext }) => {
  const currentPage = fetchInfo.offset / fetchInfo.steps + 1;

  if (assetCount < fetchInfo.steps && currentPage === 1) return null;

  return (
    <div className='py-2'>
      {currentPage > 1 && <button onClick={onPrev}>⬅️</button>}
      <small className='p-1'>Page {currentPage}</small>
      {assetCount === fetchInfo.steps && <button onClick={onNext}>➡️</button>}
    </div>
  );
};

export default Metrics;
