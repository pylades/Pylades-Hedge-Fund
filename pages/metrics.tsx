import { useEffect, useState } from 'react';
import { Page } from '../components';
import { getManagersByGame, getAllGames, managerObject } from '../assets/data/managers';
import { getAssetsOfMultipleOwners } from '../services/openseaApi';
import { ALink, OpenSeaAsset } from '../components';

const Metrics = () => {
  const [allAssets, setAllAssets] = useState([]);
  const [fetchInfo, setFetchInfo] = useState({
    offset: 0,
    limit: 24,
    steps: 24,
  });
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    loadAllAssets();
  }, [fetchInfo.offset]);

  const loadAllAssets = async () => {
    setLoading(true);
    const allManagerAddresses: Array<string> = getAllGames()
      .map(gameKey => getManagersByGame(gameKey))
      .flat()
      .map(managerInfo => managerInfo.address);
    const allAssets = await getAssetsOfMultipleOwners(allManagerAddresses, fetchInfo.offset, fetchInfo.limit);
    setAllAssets(allAssets);
    setLoading(false);
  };

  const onNext = async () => {
    const { offset, limit, steps } = fetchInfo;
    await setFetchInfo({
      offset: offset + steps,
      limit,
      steps,
    });
  };

  const onPrev = async () => {
    const { offset, limit, steps } = fetchInfo;
    if (offset < steps) return;
    await setFetchInfo({
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
