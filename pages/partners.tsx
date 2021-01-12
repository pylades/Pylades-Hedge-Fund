import { Page } from '../components';
import { usePartners } from '../hooks/usePartners';
import { ALink } from '../components';

const partners = () => {
  const { partnerArray, partnerObject } = usePartners();
  return (
    <Page title='Partners'>
      <h1>Partners</h1>
      <div>
        {partnerArray.map(partner => {
          return <ALink key={partner} href={partnerObject[partner].link} text={partnerObject[partner].name} />;
        })}
      </div>
    </Page>
  );
};
export default partners;
