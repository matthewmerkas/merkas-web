import { ComponentType } from '@angular/cdk/overlay'

export interface App {
  title: string
  routerLink: string
  imageUrl?: string
  subtitle?: string
}

export interface Colors {
  primary: string
  tertiary?: string
  secondary?: string
}

export interface DialogComponent extends ComponentType<any> {
  getData: () => object
}

export interface ExtraOption {
  id: string
  icon: string
  label: string
  component: DialogComponent
}

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

export interface RouteData {
  options: ExtraOption[]
}

export interface Site {
  _id: string
  position: number
  title: string
  url: string
  imageName?: string
  roles?: string[]
  subtitle?: string
  tags?: string[]
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
  colors?: Colors
  tokens?: Jwt
  toObject?: () => any
}

export interface UserPatch {
  colors: Colors
}

export interface UserUpdate {
  currentPassword: string
  newPassword: string
  confirmPassword?: string
}
