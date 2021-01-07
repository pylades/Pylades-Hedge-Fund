import { Page } from '../components';
import { ALink, OpenSeaAsset } from '../components';
import { useManagerInfo } from '../hooks/useManagerInfo';
import { useSoraredata } from '../hooks/useSoraredata';
import { useNFTGallery } from '../hooks/useNFTGallery';
import { SorareDataManagerInfo } from '../types';

const Metrics = () => {
  const { sorareAUM, sorareDataManagerArray } = useSoraredata();
  const { allAssets, isLoading, fetchInfo, onNext, onPrev } = useNFTGallery();
  const { allGames, managerObject } = useManagerInfo();

  return (
    <Page title='Metrics'>
      <>
        <h1>Blackpool AUM</h1>
        <div className='grid gap-1 mt-2'>
          <div>
            <div>
              <ALink href={managerObject['sorare'].link} text={'sorare'.toUpperCase()} />
            </div>
            <div className='m-2'>
              {sorareDataManagerArray.map((managerInfo: SorareDataManagerInfo) => (
                <div className='grid grid-cols-2 gap-1'>
                  <div>
                    <ALink href={managerInfo.sorareDataLink} text={managerInfo.manager} />
                  </div>
                  <div className='justify-self-end'>{managerInfo.totalValue.toLocaleString()} Ξ</div>
                </div>
              ))}
              <div className='grid grid-cols-2 gap-1 border-t mt-1 pt-1'>
                <div>Total AUM</div>
                <div className='justify-self-end'>{sorareAUM ? `${sorareAUM.toLocaleString()} Ξ` : 'loading...'}</div>
              </div>
            </div>
          </div>
        </div>
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
