import { getToken } from "../features/auth/auth.utils";

const API = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = async (url: string, options: any = {}) => {
  const token = getToken();

  return fetch(`${API}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
};
