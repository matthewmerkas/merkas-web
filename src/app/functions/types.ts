export interface Jwt {
  token: string
  refreshToken: string
}

export interface MerkasFile {
  _id?: string
  name: string
  path?: string
  mimetype?: string
  size?: number
}

export interface Site {
  _id: string
  position: number
  title: string
  url: string
  imageName?: string
  roles?: string[]
  subtitle?: string
  isDeleted?: boolean
}

export interface SoftDeletes {
  isDeleted?: boolean
}

export interface User extends SoftDeletes {
  _id?: string
  username?: string
  roles?: string[]
  boards?: string[]
  files?: MerkasFile[]
  isDeleted?: boolean
  toObject?: () => any
}

export interface UserUpdate {
  currentPassword: string
  newPassword: string
  confirmPassword?: string
}
