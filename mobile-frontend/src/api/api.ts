import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//const BASE = "http://192.192.16.98:4000/api";
const BASE = "http://10.188.169.145:4000/api";
//const BASE = "https://edmilk.com/edmilk/api";
console.log("connect to backend");
export const API = axios.create({ baseURL: BASE, timeout: 15000 });

// request interceptor to add token
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function send(data: {
  endpoint: string;
  method?: "POST" | "PUT" | "PATCH";
  payload: any;
}) {
  const { endpoint, payload, method = "POST" } = data;

  if (!endpoint) {
    throw new Error("API.send: endpoint is required");
  }
  try {
    const response = await API.request({
      url: endpoint,
      method,
      data: payload,
    });

    return response.data;
  } catch (error) {
    console.log("API.send error:", endpoint, (error as Error)?.message);
    throw error;
  }
}
export default {
  send,
};
