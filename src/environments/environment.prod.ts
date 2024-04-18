import { apiConfig } from './api.config'

export const environment = {
  production: true,
  apiUrl: 'https://merkas.com.au/api',
  socketUri: 'https://merkas.com.au',
  apiConfig,
  DEBOUNCE_TIME: 200,
  MAX_FILE_SIZE: 100000000
}
