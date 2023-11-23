export interface ICountry {
  name: {
    common: string;
    oficial: string;
  };
  capital: string[];
  flags: {
    svg: string;
    png: string;
    alt: string;
  };
  favourite: boolean;
}

export interface IPickedCountry extends ICountry {
  population: string;
  coatOfArms: {
    png: string;
    svg: string;
  };
  currencies: string[];
  region: string;
  languages: string[];
}
