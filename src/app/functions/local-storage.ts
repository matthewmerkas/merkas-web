import { jwtDecode } from 'jwt-decode'
import { Jwt, User } from './types'
import store from 'store2'
import { isStatic } from './helpers'

export const getDecoded = (): User | null => {
  const token = getToken()
  return token ? jwtDecode(token) : null
}

export const getToken = (): string | null => {
  return isStatic() || store.get('access_token')
}

export const getRealToken = () => store.get('access_token')

export const getRefreshToken = (): string | null => {
  return store.get('refresh_token')
}

export const removeTokens = (): void => {
  store.remove('access_token')
  store.remove('refresh_token')
}

export const setTokens = (res: Jwt): void => {
  if (!res) return
  store.set('access_token', res.token)
  store.set('refresh_token', res.refreshToken)
}

export const getItem = (key: string) => {
  return JSON.parse(store.get(key)!)
}

export const removeItem = (key: string) => {
  return store.remove(key)
}

export const setItem = (key: string, item: any) => {
  return store.set(key, JSON.stringify(item))
}
