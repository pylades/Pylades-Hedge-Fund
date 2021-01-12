import axios from 'axios';
import humps from 'humps';
import { OpenSeaAssetDetails } from '../types';

const BASEURL = 'https://api.opensea.io/api/v1';

const fetch = async url => {
  let res = null;
  try {
    const { data } = await axios.get(url, { headers: { 'x-api-key': process.env.NEXT_PUBLIC_OPENSEA_KEY } });
    res = humps.camelizeKeys(data);
  } catch (e) {
    console.error(e);
  }
  return res;
};

export const getAssetsOfSingleOwner = async (
  ownerAddress: string,
  offset = 0,
  limit = 50,
  sortBy = 'sale_price'
): Promise<Array<OpenSeaAssetDetails>> => {
  const res =
    (await fetch(
      `${BASEURL}/assets?order_by=${sortBy}&owner=${ownerAddress}&order_direction=desc&offset=${offset}&limit=${limit}`
    )) || {};
  return res.assets || [];
};

export const getAssetsOfMultipleOwners = async (
  ownerAddresses: Array<string>,
  allContractAddresses: Array<string>,
  offset = 0,
  limit = 50,
  sortBy
): Promise<Array<OpenSeaAssetDetails>> => {
  const ownersString = ownerAddresses.join('&owners=');
  const nftsString = allContractAddresses.join('&asset_contract_addresses=');
  const res =
    (await fetch(
      `${BASEURL}/assets?order_by=${sortBy}&owners=${ownersString}&asset_contract_addresses=${nftsString}&order_direction=desc&offset=${offset}&limit=${limit}`
    )) || {};
  return res.assets || [];
};
