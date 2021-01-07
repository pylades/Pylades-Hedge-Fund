import axios from 'axios';
import humps from 'humps';

const BASEURL = 'https://www.soraredata.com/api';

const fetch = async url => {
  let res = null;
  try {
    const { data } = await axios.get(url);
    res = humps.camelizeKeys(data);
  } catch (e) {
    console.error(e);
  }
  return res;
};

export const getManagerValueList = async () => {
  return await fetch(`https://soraredata-api-5nrclfsm3a-ew.a.run.app/blackpool/value`);
};
