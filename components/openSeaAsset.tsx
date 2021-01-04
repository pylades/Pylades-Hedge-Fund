import Link from 'next/link';

const OpenSeaAsset = ({ asset }) => {
  const { imageUrl, name, permalink } = asset;
  return (
    <div className='cursor-pointer hover:opacity-75 duration-150'>
      <Link href={permalink}>
        <a target='_blank' ref='noopener noreferrer' href={permalink}>
          <img src={imageUrl} />
          <small>{name}</small>
        </a>
      </Link>
    </div>
  );
};

export { OpenSeaAsset };
