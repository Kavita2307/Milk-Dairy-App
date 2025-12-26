const TOKEN_KEY = "ed_token";
const USER_KEY = "ed_user";

export const setAuth = (token: string, user: unknown) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem("ed_token");
  localStorage.removeItem("ed_user");
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};
