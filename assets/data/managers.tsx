import { ManagerObject, ManagerInfo } from '../../types';
import axios from 'axios';
// structure:
// - Obj Keys are all vailable game verticals
// - Managers are stored per vertical

export const managerObject: ManagerObject = require('./managers.json');

export const managers = async () => {
  return await axios.get('https://raw.githubusercontent.com/BlackPool-Finance/managers/main/verticals.json');
};

export const getManagersByGame = gameName => {
  return (managerObject[gameName] || {}).managers as Array<ManagerInfo>;
};

export const getAllGames = () => {
  return Object.keys(managerObject);
};
