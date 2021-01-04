export interface ManagerObject {
  [contractId: string]: GameDetails;
}

export interface GameDetails {
  vertical: string;
  link: string;
  nftContractAddress: string;
  managers: Array<ManagerInfo>;
}

export interface ManagerInfo {
  username: string;
  link: string;
  cardWallet: string;
  fundingAddress: string;
  soraredata: string;
}
