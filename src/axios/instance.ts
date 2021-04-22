import axios from "axios";

import getAuthHeader from "../helpers/getAuthHeader";

import { serverUrl } from "../const";

const instance = axios.create({
  baseURL: serverUrl,
  headers: {
    ["current-user"]: "67",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getAuthHeader();

    if (token) {
      config.headers["current-user"] = token;
    } else {
      delete instance.defaults.headers["current-user"];
    }
    return config;
  },

  (error) => Promise.reject(error)
);

export default instance;
