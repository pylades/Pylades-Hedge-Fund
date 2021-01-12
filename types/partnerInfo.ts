export interface PartnerObject {
  [partnerName: string]: PartnerInfo;
}

export interface PartnerInfo {
  name: string;
  link: string;
}
