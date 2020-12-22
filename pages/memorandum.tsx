import { Page } from '../components';

const Memorandum = () => {
  return (
    <Page title='Memorandum'>
      <>
        <h3>Memorandum</h3>
        <p>
          BlackPool is the first fund operating exclusively within the non-fungible tokens (NFT) space: from sports
          cards to game items to digital art.
        </p>
        <p>
          BlackPool finances active specialist pools of capital managed by engaged individuals on a selection of growing
          NFT platforms including, but not limited to:
        </p>
        <ul className='dashed'>
          <li>A Sorare team competing in the SO5 fantasy league</li>
          <li>A set of Axies playing to earn SLPs in Axie Infinity’s game arena</li>
          <li>A set of Decentraland parcels fully built out to generate throughput</li>
          <li>An actively managed collection of digital art on SuperRare</li>
        </ul>
        <p>
          BlackPool aims to become a leading provider of financial derivatives in digital asset marketplaces, including
          asset valuation indexes, insurance mechanisms and actively managed strategies.
        </p>
        <p>
          Stemming from DeFi origins, BlackPool’s long term goal is to provide democratised access to the scarcest
          non-fungible assets, that users might individually not be able to buy themselves. While BlackPool is currently
          financed solely by internal capital, we expect to open up an allocation to liquidity providers in the future.
        </p>
        <p>
          Blackpool will decentralise its current operation through a DAO mechanism, where access and activity of
          BlackPools’ non-fungible assets will be decided via the BlackPool DAO. New features will be announced in the
          coming weeks that will help us progress toward this goal.
        </p>
      </>
      <br />
      <>
        <h3>Transparency & Fair Play</h3>
        <p>
          BlackPool commits to a high level of transparency on the capital flows that happen on-chain and will always
          keep a clear record of NFT platforms / managed pools it finances.
        </p>
        <p>
          BlackPool will disclose existing investments in underlying NFT platforms where they might overlap with our
          strategies.
        </p>
        <p>
          While the digital assets BlackPool holds are always fully permissionless, BlackPool will always abide by the
          rules of each NFT platform when using its assets.
        </p>
        <br />
        Game on.
      </>
    </Page>
  );
};
export default Memorandum;
