import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: "",
    timeout: 8000,
  });
  instance.interceptors.response.use(function (response) {
    let res = response.data;
    if (res.status == 0) {
      return res.data;
    } else {
      return Promise.reject(res);
    }
  });
  return instance(config);
}
