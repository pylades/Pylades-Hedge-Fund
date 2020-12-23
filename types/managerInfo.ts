export interface ManagerObject {
  [contractId: string]: GameDetails;
}

export interface GameDetails {
  vertical: string;
  link: string;
  managers: Array<ManagerInfo>;
}

export interface ManagerInfo {
  address: string;
  nickname: string;
  verification: boolean;
}
