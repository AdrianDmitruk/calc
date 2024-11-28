export interface CurrencyRate {
  code: string;
  name: string;
  crypto: boolean;
  rate: number;
  lastUpdate: string;
}

export interface CurrencyRatesResponse {
  rateCode: string;
  rates: CurrencyRate[];
}
