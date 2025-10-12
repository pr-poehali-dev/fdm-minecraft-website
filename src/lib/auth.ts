const AUTH_TOKEN_KEY = 'admin_auth_token';
const AUTH_USER_KEY = 'admin_user';

export interface AuthUser {
  username: string;
  token: string;
}

export const setAuthToken = (token: string, username: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, username);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getAuthUser = (): AuthUser | null => {
  const token = getAuthToken();
  const username = localStorage.getItem(AUTH_USER_KEY);
  
  if (!token || !username) return null;
  
  return { token, username };
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};
