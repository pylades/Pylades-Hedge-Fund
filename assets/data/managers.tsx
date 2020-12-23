import { ManagerObject, ManagerInfo } from '../../types';
import axios from 'axios';
// structure:
// - Obj Keys are all vailable game verticals
// - Managers are stored per vertical

export const managerObject: ManagerObject = {
  sorare: {
    vertical: 'sorare',
    link: 'https://sorare.com/',
    managers: [
      {
        address: '0x90778E7335EF8350a7F2EAe37FC6D549E4ABf095',
        nickname: 'AJ',
        verification: true,
      },
      {
        address: '0x84265C1652D6382b6244d958B193ef5895781D5A',
        nickname: 'Maxmersch',
        verification: true,
      },
    ],
  },
};

export const managers = async () => {
  return await axios.get('https://raw.githubusercontent.com/BlackPool-Finance/managers/main/verticals.json');
};

export const getManagersByGame = gameName => {
  return (managerObject[gameName] || {}).managers as Array<ManagerInfo>;
};

export const getAllGames = () => {
  return Object.keys(managerObject);
};
