import { Page } from '../components';

const Home = () => {
  return (
    <Page title='/'>
      <img
        style={{ width: 250 }}
        src={require('../assets/png/logo-500x100.png')}
        alt='blackpool logo'
        className='my-28'
      />
      <p>
        BlackPool is a new fund operating within the NFT industry: managing a range of assets from sports cards to game
        items to digital art.
      </p>
      <p>
        BlackPool is the first decentralised autonomous organisation (DAO) built solely for NFT gaming and trading. Our
        strategies will be based on our long-term passion for gaming and art, as we combine professional data analytics
        and machine learning to provide the best returns for our users.
      </p>
      <p>
        We will lead the way in providing financial derivatives to digital marketplaces, by offering services such as
        asset valuation indices, leasing, insurance mechanisms, and more.
      </p>
      <p>
        BlackPool firmly believes in the long term value of scarce digital assets, and understand that a high level of
        specialisation in each NFT platform is required to maximise value creation. Therefore, we will always seek to
        employ expertise to improve our performance on each platform.
      </p>
      <br />
      <p>BlackPool generates cashflows and accrues value for the DAO by:</p>
      <ul className='dashed'>
        <li>taking arbitrage opportunities between primary and secondary markets</li>
        <li>loaning out assets</li>
        <li>buying and selling assets based on news</li>
        <li>scouting for assets that will accrue in value and buying early</li>
        <li>in-game competition</li>
      </ul>
    </Page>
  );
};
export default Home;
