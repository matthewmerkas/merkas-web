import { jwtDecode } from 'jwt-decode'
import { Jwt, User } from './types'
import store from 'store2'

export function getDecoded(): User | null {
  const token = getToken()
  return token ? jwtDecode(token) : null
}

export function getToken(): string | null {
  return store.get('access_token')
}

export function getRefreshToken(): string | null {
  return store.get('refresh_token')
}

export function removeTokens(): void {
  store.remove('access_token')
  store.remove('refresh_token')
}

export function setTokens(res: Jwt): void {
  if (!res) return
  store.set('access_token', res.token)
  store.set('refresh_token', res.refreshToken)
}

export function getItem(key: string) {
  return JSON.parse(store.get(key)!)
}

export function removeItem(key: string) {
  return store.remove(key)
}

export function setItem(key: string, item: any) {
  return store.set(key, JSON.stringify(item))
}
