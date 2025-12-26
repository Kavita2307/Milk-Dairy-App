import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//const BASE = "http://192.192.16.98:4000/api";
const BASE = "http://172.28.200.145:4000/api";
//const BASE = "https://edmilk.com/edmilk/api";
console.log("connect to backend");
export const API = axios.create({ baseURL: BASE });

// request interceptor to add token
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
