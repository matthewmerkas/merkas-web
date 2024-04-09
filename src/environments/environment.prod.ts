import { apiConfig } from './api.config'

export const environment = {
  production: true,
  apiUrl: 'http://localhost:3001/api',
  socketUri: 'http://localhost:3001',
  apiConfig,
  DEBOUNCE_TIME: 200,
  MAX_FILE_SIZE: 128000000
}
