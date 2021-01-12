import Select from 'react-select';
import { Page } from '../components';
import { ALink, OpenSeaAsset } from '../components';
import { useManagerInfo } from '../hooks/useManagerInfo';
import { useSoraredata } from '../hooks/useSoraredata';
import { useNFTGallery } from '../hooks/useNFTGallery';
import { SorareDataManagerInfo, ManagerInfo } from '../types';

const Metrics = () => {
  const { sorareAUM, sorareDataManagerArray } = useSoraredata();
  const { allAssets, isLoading, fetchInfo, onNext, onPrev, setSelectedOption, sortOptions } = useNFTGallery();
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
        <h1>All Assets</h1>
        <div className='flex justify-space-between'>
          {renderPagination({ assetCount: allAssets.length, fetchInfo, onPrev, onNext })}
          {renderSortButtons({ sortOptions, setSelectedOption, fetchInfo })}
        </div>
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
    <div className='py-2 inline-flex'>
      {currentPage > 1 && <button onClick={onPrev}>⬅️</button>}
      <p className='p-1'>Page {currentPage}</p>
      {assetCount === fetchInfo.steps && <button onClick={onNext}>➡️</button>}
    </div>
  );
};

const renderSortButtons = ({ setSelectedOption, sortOptions, fetchInfo }) => {
  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'black', color: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: 'black',
        borderColor: 'black',
      };
    },
    singleValue: styles => ({ ...styles, color: 'white' }),
    menu: styles => ({ ...styles, backgroundColor: 'black', color: 'white' }),
  };

  return (
    <div className='ml-auto max-w-sm w-56'>
      <Select
        instanceId={'select-order'}
        styles={colourStyles}
        defaultValue={fetchInfo.selectedOption}
        onChange={setSelectedOption}
        options={sortOptions}
      />
    </div>
  );
};

export default Metrics;
