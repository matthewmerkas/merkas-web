import { User } from './types'

export const isAdmin = (user: User | undefined) => {
  return user?.roles != null && user.roles.indexOf('admin') > -1
}

export const isManager = (user: User | undefined) => {
  return user?.roles != null && user.roles.indexOf('manager') > -1
}
