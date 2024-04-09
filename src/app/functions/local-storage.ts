import { jwtDecode } from 'jwt-decode'
import { Jwt, User } from './types'

export function getDecoded(): User | null {
  const token = getToken()
  return token ? jwtDecode(token) : null
}

export function getToken(): string | null {
  return localStorage.getItem('access_token')
}

export function getRefreshToken(): string | null {
  return localStorage.getItem('refresh_token')
}

export function removeTokens(): void {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

export function setTokens(res: Jwt): void {
  localStorage.setItem('access_token', res.token)
  localStorage.setItem('refresh_token', res.refreshToken)
}
