import axios from "axios";

import { getUsers } from ".";

import { ICountry } from "../redux/countries-slice";

const projectid = import.meta.env.VITE_SANITY_PROJECT_ID;
const sanityToken = import.meta.env.VITE_SANITY_API_TOKEN;

export const addToFav = async (data: ICountry[]) => {
  const res = await getUsers();
  const { _id } = await res.data;

  return axios.post(
    `https://${projectid}.api.sanity.io/v1/data/mutate/production`,
    {
      mutations: [
        {
          patch: {
            id: _id,
            set: {
              favourites: data,
            },
          },
        },
      ],
    }
  );
};
