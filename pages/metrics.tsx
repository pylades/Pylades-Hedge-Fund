import Select from 'react-select';
import { Page } from '../components';
import { ALink, OpenSeaAsset } from '../components';
import { useManagerInfo } from '../hooks/useManagerInfo';
import { useSoraredata } from '../hooks/useSoraredata';
import { useNFTGallery } from '../hooks/useNFTGallery';
import { SorareDataManagerInfo, ManagerInfo } from '../types';

const Metrics = () => {
  const { sorareAUM, sorareDataManagerArray } = useSoraredata();
  const {
    allAssets,
    isLoading,
    fetchInfo,
    onNext,
    onPrev,
    setSelectedOption,
    sortOptions,
    managerOptions,
    setManagerOption,
  } = useNFTGallery();
  const { managerObject } = useManagerInfo();

  const sorareManagerInfo = managerObject['sorare'];

  const findManagerByName = (managerName: string): ManagerInfo =>
    sorareManagerInfo.managers.find(managerInfo => managerInfo.username.toLowerCase() === managerName.toLowerCase());

  return (
    <Page title='Metrics'>
      <>
        <h1>Blackpool AUM</h1>
        <div className='grid gap-1 mt-2'>
          <div>
            <ALink href={sorareManagerInfo.link} text={'sorare'.toUpperCase()} />
            <div className='m-2'>
              {sorareDataManagerArray.map((managerInfo: SorareDataManagerInfo, index) => (
                <div className='grid grid-cols-2 gap-1' key={index}>
                  <div>
                    <ALink href={managerInfo.sorareDataLink} text={findManagerByName(managerInfo.manager).manager} />
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
        <div className='flex justify-between items-center'>
          <h1>Blackpool Assets</h1>
          {renderPagination({ assetCount: allAssets.length, fetchInfo, onPrev, onNext })}
        </div>
        {optionButtons({ sortOptions, setSelectedOption, fetchInfo, managerOptions, setManagerOption })}
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

  // return empty div to not mess up the grid view
  if (assetCount < fetchInfo.steps && currentPage === 1) return <div></div>;

  return (
    <div className='inline-flex'>
      {currentPage > 1 && (
        <button onClick={onPrev} className='focus:outline-none'>
          <svg className='h-2' width='16px' height='16px' viewBox='0 0 124 124' version='1.1'>
            <g id='Artboard' transform='translate(-12.000000, -6.000000)' fill='#FFFFFF'>
              <path
                d='M76.9442719,17.8885438 L128.763932,121.527864 C131.233825,126.467649 129.231581,132.474379 124.291796,134.944272 C122.903242,135.638549 121.372111,136 119.81966,136 L16.1803399,136 C10.6574924,136 6.18033989,131.522847 6.18033989,126 C6.18033989,124.447549 6.54179081,122.916418 7.23606798,121.527864 L59.0557281,17.8885438 C61.5256206,12.9487588 67.532351,10.9465154 72.472136,13.4164079 C74.40741,14.3840449 75.9766349,15.9532698 76.9442719,17.8885438 Z'
                id='Triangle'
                transform='translate(68.000000, 68.000000) scale(-1, 1) rotate(90.000000) translate(-68.000000, -68.000000) '></path>
            </g>
          </svg>
        </button>
      )}
      <p className='p-1'>Page {currentPage}</p>
      {assetCount === fetchInfo.steps && (
        <button onClick={onNext} className='focus:outline-none'>
          <svg className='h-2' width='16px' height='16px' viewBox='0 0 124 124' version='1.1'>
            <g id='Artboard' transform='translate(0.000000, -6.000000)' fill='#FFFFFF'>
              <path
                d='M76.9442719,17.8885438 L128.763932,121.527864 C131.233825,126.467649 129.231581,132.474379 124.291796,134.944272 C122.903242,135.638549 121.372111,136 119.81966,136 L16.1803399,136 C10.6574924,136 6.18033989,131.522847 6.18033989,126 C6.18033989,124.447549 6.54179081,122.916418 7.23606798,121.527864 L59.0557281,17.8885438 C61.5256206,12.9487588 67.532351,10.9465154 72.472136,13.4164079 C74.40741,14.3840449 75.9766349,15.9532698 76.9442719,17.8885438 Z'
                id='Triangle'
                transform='translate(68.000000, 68.000000) rotate(90.000000) translate(-68.000000, -68.000000)'></path>
            </g>
          </svg>
        </button>
      )}
    </div>
  );
};

const optionButtons = ({ setSelectedOption, sortOptions, fetchInfo, managerOptions, setManagerOption }) => {
  const colorStylesOrder = {
    control: styles => ({
      ...styles,
      backgroundColor: 'none',
      padding: 0,
      boxShadow: 'none',
      border: 'none',
      cursor: 'pointer',
    }),
    option: styles => ({ ...styles, backgroundColor: 'black', borderColor: 'black' }),
    valueContainer: styles => ({ ...styles, padding: 0, justifyContent: 'flex-end', fontSize: '0.72rem' }),
    singleValue: styles => ({ ...styles, color: 'white', border: 'none', padding: 0, marginRight: '1rem' }),
    menu: styles => ({ ...styles, backgroundColor: 'black', color: 'white' }),
  };

  const colorStylesManager = {
    ...colorStylesOrder,
    valueContainer: styles => ({ ...styles, padding: 0, justifyContent: 'flex-start', fontSize: '0.72rem' }),
  };

  return (
    <div className='grid grid-cols-10 grid-rows-1'>
      <div className='max-w-sm col-start-1 col-end-5'>
        <Select
          instanceId={'select-manager'}
          styles={colorStylesManager}
          defaultValue={managerOptions[0]}
          onChange={setManagerOption}
          options={managerOptions}
        />
      </div>
      <div className='max-w-sm col-start-5 col-end-11'>
        <Select
          instanceId={'select-order'}
          styles={colorStylesOrder}
          defaultValue={sortOptions[0]}
          onChange={setSelectedOption}
          options={sortOptions}
        />
      </div>
    </div>
  );
};

export default Metrics;
