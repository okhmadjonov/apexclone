import { AuthState, IParams } from "@/interfaces";
import { dispatch, getState } from "@/redux";
import localStorageHelper from "@/utils";
import Axios from "axios";

const VERSION = "1.0";
export const TEST_BASE_URL = `https://test.backend.lakemedia.uz/api/${VERSION}/`;
export const BASE_URL = `https://backend.lakemedia.uz/api/${VERSION}/`;

const transformAxiosInstance = (
  url: string,
  data: any,
  method: "PUT" | "POST"
) => {
  return {
    method,
    data,
    url,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
};

export const axiosInstance = Axios.create({
  baseURL: TEST_BASE_URL,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// run before each request
axiosInstance.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      const token = getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },

  (error) => Promise.reject(error)
);

const originalRequests: any = [];

// run after each response
axiosInstance.interceptors.response.use(
  (response) => {
    localStorageHelper.removeItem("isRefresh");
    return Promise.resolve(response);
  },
  async (error) => {
    const originalRequest = error.config;
    const idx = originalRequests.findIndex((item: any) =>
      item.url.includes(originalRequest.url)
    );

    if (idx < 0 && error.response.status !== 409) {
      originalRequests.push(originalRequest);
    } else {
      originalRequests.splice(idx, 1, originalRequest);
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const isRefresh = localStorageHelper.getItem("isRefresh");

      if (!isRefresh) {
        localStorageHelper.setItem("isRefresh", true);
      }

      try {
        const auth: AuthState = getState().auth;

        if (auth && !isRefresh) {
          const response = await API.refreshToken({
            AccessToken: auth.token as string,
            RefreshToken: auth.refreshToken as string,
          });

          const { accessToken, refreshToken } = response;
          dispatch.auth.login({ token: accessToken, refreshToken });

          originalRequests.forEach((element: any) => {
            element.headers["Authorization"] = `Bearer ${accessToken}`;
            return axiosInstance(element);
          });
          originalRequests.splice(idx, originalRequests.length);
          return Promise.reject(error);
        } else {
          localStorageHelper.removeItem("isRefresh");
          return Promise.reject(error);
        }
      } catch (refreshError: any) {
        if (refreshError.response.status !== 409) {
          setTimeout(() => {
            dispatch.auth.logoutAsync();
          }, 3000);

          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const API = {
  //Auth
  login: (data: any) =>
    axiosInstance.post("Auth/login", data).then((res) => res.data),
  refreshToken: (data: any) =>
    axiosInstance(transformAxiosInstance("Auth/refresh", data, "POST")).then(
      (res) => res.data
    ),
  getUser: () => axiosInstance.get("Auth/me").then((res) => res.data),

  //USERS
  getUsers: (params: IParams) =>
    axiosInstance.get("Users", { params }).then((res) => res.data),
  updateUsers: (data: any) =>
    axiosInstance(transformAxiosInstance("Users", data, "PUT")).then(
      (res) => res.data
    ),
  getUsersById: (id: string) =>
    axiosInstance.get("Users/" + id).then((res) => res.data),
 



  //MANUFACTURES
  getManufacturers: (params: IParams) =>
    axiosInstance.get("Manufacturers", { params }).then((res) => res.data),
  postManufacturers: (data: any) =>
    axiosInstance(transformAxiosInstance("Manufacturers", data, "POST")).then(
      (res) => res.data
    ),
  updateManufacturers: (data: any) =>
    axiosInstance(transformAxiosInstance("Manufacturers", data, "PUT")).then(
      (res) => res.data
    ),
  deleteManufacturers: (id: string) =>
    axiosInstance.delete("Manufacturers/" + id).then((res) => res.data),
  getManufacturerById: (id: string) =>
    axiosInstance.get("Manufacturers/" + id).then((res) => res.data),

  //PRODUCT_CATEGORY
  getProductCategories: (params: IParams) =>
    axiosInstance.get("ProductCategories", { params }).then((res) => res.data),
  postProductCategories: (data: any) =>
    axiosInstance(
      transformAxiosInstance("ProductCategories", data, "POST")
    ).then((res) => res.data),
  updateProductCategories: (data: any) =>
    axiosInstance(
      transformAxiosInstance("ProductCategories", data, "PUT")
    ).then((res) => res.data),
  deleteProductCategories: (id: string) =>
    axiosInstance.delete("ProductCategories/" + id).then((res) => res.data),
  getProductCategoryById: (id: string) =>
    axiosInstance.get("ProductCategories/" + id).then((res) => res.data),



  //REGIONS
  getRegions: () => axiosInstance.get("Regions/all").then((res) => res.data),


  //LANGUAGE
  getLanguages: () =>
    axiosInstance.get("Languages/all").then((res) => res.data),
  getLanguageById: (id: string) =>
    axiosInstance.get("Languages/" + id).then((res) => res.data),


};
