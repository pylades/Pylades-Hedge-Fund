import { Page, ALink } from '../components';

const About = () => {
  return (
    <Page title='About'>
      <div>
        <h3>Fund</h3>
        We are a team of Portfolio Managers, Traders and Analysts.
      </div>
      <br />
      <div>
        <h3>Investors</h3>
        <p>
          <ALink href='https://www.fabric.vc/' text='Fabric VC' />
          <br />
          <ALink href='https://www.stake.capital' text='Stake Capital' />
        </p>
      </div>
      <br />
      <div>
        <h3>Follow us</h3>
        <p>
          Twitter: <ALink href='https://twitter.com/BlackpoolHQ' text='@BlackpoolHQ' />
        </p>
        <p>
          Telegram: <ALink href='https://t.me/BlackpoolHQ' text='https://t.me/BlackpoolHQ' />
        </p>
        <p>
          Medium: <ALink href='https://blackpool.medium.com' text='https://blackpool.medium.com' />
        </p>
      </div>
    </Page>
  );
};
export default About;
