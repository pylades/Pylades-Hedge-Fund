import { NextApiRequest, NextApiResponse } from 'next';
import { getManagerValueList } from '../../../services/sorareDataApi';
import { SorareDataManagerInfo } from '../../../types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = (await getManagerValueList()) as SorareDataManagerInfo[];
  const sorareDataManagerArray = data.map(managerInfo => ({
    ...managerInfo,
    totalValue: Math.floor(managerInfo.totalValue * 100) / 100,
    sorareDataLink: `https://www.soraredata.com/manager/${managerInfo.manager}`,
  }));

  const sorareAUM = Math.floor(sorareDataManagerArray.reduce((prev, cur) => prev + cur.totalValue, 0) * 100) / 100;

  res.status(200).json({ sorareDataManagerArray, sorareAUM });
};

export default handler;
