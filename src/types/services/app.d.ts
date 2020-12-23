export interface IClientIpInfo {
  latitude: number;
  longitude: number;
  zoom: number;
  address:
  {
    continent: string;
    continent_code: string;
    city: string;
    country: string;
    country_code: string;
    region: string;
  };
}