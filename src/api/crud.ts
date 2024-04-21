import axios from "axios";
import { VITE_API_URL } from "../utils/env";

export const get = (url: string, params?: any) => {
  return axios
    .get(`${VITE_API_URL}/${url}`, params ? { params } : {})
    .then((res) => res.data);
};

export const create = (url: string, data: any) => {
  return axios.post(`${VITE_API_URL}/${url}`, data).then((res) => res.data);
};

export const update = (url: string, data: any) => {
  return axios.put(`${VITE_API_URL}/${url}`, data).then((res) => res.data);
};

export const remove = (url: string) => {
  return axios.delete(`${VITE_API_URL}/${url}`).then((res) => res.data);
};
