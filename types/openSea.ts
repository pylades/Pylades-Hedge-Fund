export interface OpenSeaAssetDetails {
  tokenId: string;
  imageUrl: string;
  name: string;
  traits: Array<Trait>;
  owner: {
    address: string;
  };
  assetContract: {
    address: string;
    optionalValue?: string;
  };
  optionalValue?: string;
}
interface Trait {
  traitType: string;
  value: string;
  traitCount: number;
  optionalValue?: string;
}
