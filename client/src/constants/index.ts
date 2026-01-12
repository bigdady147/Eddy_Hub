export const APP_CONFIG = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  TIMEOUT: 10000,
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANG: 'lang',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
