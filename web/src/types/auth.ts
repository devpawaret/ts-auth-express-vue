import type { User } from './user'

export interface RegisterDto {
  username: string
  password: string
  confirmPassword: string
}

export type RegisterErrorDto = {
  [K in keyof RegisterDto]?: string
}

export interface LoginDto {
  username: string
  password: string
}

export type LoginErrorDto = {
  [K in keyof LoginDto]?: string
}

export interface MessageResponse {
  message: string
}

export interface AuthPayload {
  user: User
  accessToken: string
}

export interface RegisterResponse extends MessageResponse {}

export interface LoginResponse extends AuthPayload, MessageResponse {}

export interface LogoutResponse extends MessageResponse {}

export interface RefreshTokenResponse {
  accessToken: string
}
