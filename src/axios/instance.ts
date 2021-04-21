import axios from "axios";

import { serverUrl } from "../const";

const instance = axios.create({
  baseURL: serverUrl,
  headers: {
    ["current-user"]: "67",
  },
});

export default instance;
