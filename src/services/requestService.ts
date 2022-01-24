import axios, { AxiosPromise, AxiosRequestConfig } from "axios";

axios.defaults.headers["x-api-key"] = "key";

export function request(
  method: AxiosRequestConfig["method"],
  url: AxiosRequestConfig["url"],
  data?: AxiosRequestConfig["data"],
  headers?: AxiosRequestConfig["headers"],
  responseType?: AxiosRequestConfig["responseType"]
): AxiosPromise {
  return axios({
    method,
    url,
    data,
    headers,
    responseType
  });
}
