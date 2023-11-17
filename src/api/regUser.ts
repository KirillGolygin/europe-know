import axios from "axios";

const projectid = import.meta.env.VITE_SANITY_PROJECT_ID;
const sanityToken = import.meta.env.VITE_SANITY_API_TOKEN;

export const regUser = (data: { login: string; password: string }) =>
  axios.post(
    `https://${projectid}.api.sanity.io/v1/data/mutate/production`,
    {
      mutations: [
        {
          create: {
            _type: "users",
            login: data.login,
            password: data.password,
          },
        },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sanityToken}`,
      },
    }
  );
