import { ManagerObject, ManagerInfo } from '../../types';

// todo: Dynamically import Manager JSON from Github: https://github.com/BlackPool-Finance/managers/blob/main/verticals.json

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
      // {
      //   address: '0x82d92b7bc6dff8775679e6a6c870db3231e6d925',
      //   nickname: 'Example Manager',
      //   verification: false,
      // },
    ],
  },
};

export const getManagersByGame = gameName => {
  return (managerObject[gameName] || {}).managers as Array<ManagerInfo>;
};

export const getAllGames = () => {
  return Object.keys(managerObject);
};
