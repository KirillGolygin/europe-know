import type { ICountry } from './country';

export interface IUser {
  _id: string;
  login: string;
  password: string;
  favourits: ICountry[];
}
