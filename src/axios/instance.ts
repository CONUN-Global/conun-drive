import axios from "axios";

import { serverUrl } from "../const";

const instance = axios.create({
  baseURL: serverUrl,
});

export default instance;
