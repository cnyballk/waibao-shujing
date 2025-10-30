import { getLocalStoreConfig, removeLocalStoreConfig } from "@/setting";
import { userStore } from "@/store/userStore";
import { message } from "antd";
import axios, { AxiosRequestConfig, Method } from "axios";
import { isArray } from "lodash-es";
import { history } from "umi";

export const baseApi = "/api";
// export const baseApi = "http://202.104.149.204:9109";

export const service = axios.create({
  baseURL: baseApi,
  // timeout: 10000,
});

async function apiAxios(method: Method, url: string, options: AxiosRequestConfig = {}): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const { headers, ...params } = options;

    const config: AxiosRequestConfig = {
      method,
      url,
      headers: {
        ...headers,
      },
    };
    const token = getLocalStoreConfig("TOKEN");
    if (token) {
      config.headers["authorization"] = "Bearer " + token;
    }
    if (method === "GET") {
      config.params = params;
    } else {
      config.data = params;
    }

    try {
      const { data } = await service(config);
      const { code, result } = data;
      if (code == 401) {
        userStore.setState({ isLogin: false, user: {}, roles: [], permissions: [] });
        removeLocalStoreConfig("TOKEN");
        history.push("/login");
        return;
      }
      if (code && code !== 200) {
        console.error(data.message);
        reject(data);
      } else {
        resolve(result || data);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export const request = {
  get: function (url: string, params?: any) {
    return apiAxios("GET", url, params);
  },
  post: function (url: string, params?: any) {
    return apiAxios("POST", url, params);
  },
  put: function (url: string, params?: any) {
    return apiAxios("PUT", url, params);
  },
  delete: function (url: string, params?: any) {
    return apiAxios("DELETE", url, params);
  },
};
//@ts-ignore
export const fetcher = (data) => {
  if (isArray(data)) {
    const [url, params] = data;
    return request.get(url, params);
  } else {
    return request.get(data);
  }
};
//@ts-ignore
export const fetcherPost = (data) => {
  if (isArray(data)) {
    const [url, params] = data;
    return request.post(url, params);
  } else {
    return request.post(data);
  }
};
