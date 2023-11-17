import axios from "axios";

export const getUsers = () =>
  axios.get(
    "https://x130wuph.api.sanity.io/v1/data/query/production?query=*[_type == 'users']{login, password}"
  );
