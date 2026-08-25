export const APP_CONSTANTS = {
  API_BASE_URL: 'https://nodejs-nokta.vercel.app/api'
  // API_BASE_URL: 'http://localhost:3000/api'
}

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    SIGNIN: '/auth/signin',
    LOGOUT: '/auth/logout',
    GET_ME: '/auth/me'
  },
  NOKTA: {
    GET_ALL: '/nokta',
    GET_ALL_BY_ID: (personId: string) => `/nokta/person/${personId}`,
    GET_BY_ID: (id: string) => `/nokta/${id}`,
    CREATE: '/nokta',
    UPDATE: (id: string) => `/nokta/${id}`,
    DELETE: (id: string) => `/nokta/${id}`
  }
}
