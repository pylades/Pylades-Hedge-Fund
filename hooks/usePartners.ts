import { PartnerObject } from '../types';

export const usePartners = () => {
  const partnerObject: PartnerObject = require('../assets/data/partners.json');
  const partnerArray: string[] = Object.keys(partnerObject);

  return {
    partnerObject,
    partnerArray,
  };
};
