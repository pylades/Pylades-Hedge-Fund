import { ManagerObject, ManagerInfo } from '../../types';
// structure:
// - Obj Keys are all vailable game verticals
// - Managers are stored per vertical

export const managerObject: ManagerObject = require('./managers.json');

export const getManagersByGame = (gameName): Array<ManagerInfo> => {
  return (managerObject[gameName] || {}).managers;
};

export const getAllGames = (): Array<string> => {
  return Object.keys(managerObject);
};

export const getAllManagerAddresses = (): Array<string> => {
  return getAllGames()
    .map(gameKey => getManagersByGame(gameKey))
    .flat()
    .map(managerInfo => managerInfo.cardWallet);
};

export const getAllContractAddresses = (): Array<string> => {
  return getAllGames().map(gameKey => managerObject[gameKey].nftContractAddress);
};
