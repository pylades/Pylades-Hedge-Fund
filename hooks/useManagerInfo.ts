import { ManagerObject, ManagerInfo } from '../types';
// structure:
// - Obj Keys are all vailable game verticals
// - Managers are stored per vertical

export const useManagerInfo = () => {
  const managerObject: ManagerObject = require('../assets/data/managers.json');

  const getManagersByGame = (gameName): Array<ManagerInfo> => {
    return (managerObject[gameName] || {}).managers;
  };

  const allGames: Array<string> = Object.keys(managerObject);

  // NFT wallets of all managers of all games
  const allManagerAddresses: Array<string> = allGames
    .map(gameKey => getManagersByGame(gameKey))
    .flat()
    .map(managerInfo => managerInfo.cardWallet);

  // NFT contract addresses of games where Blackpool is active
  const allContractAddresses: Array<string> = allGames.map(gameKey => managerObject[gameKey].nftContractAddress);

  return {
    managerObject,
    getManagersByGame,
    allGames,
    allManagerAddresses,
    allContractAddresses,
  };
};
