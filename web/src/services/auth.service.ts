import service from '@/utils/request'
import type * as TypeAuth from '@/types/auth'
import type { User } from '@/types/user'

export const register = async (data: TypeAuth.RegisterDto) => {
  return service.request<TypeAuth.RegisterResponse>({
    url: '/auth/register',
    method: 'post',
    data,
  })
}

export const login = async (data: TypeAuth.LoginDto) => {
  return service.request<TypeAuth.LoginResponse>({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

export const logout = async () => {
  return service.request<TypeAuth.LogoutResponse>({
    url: '/auth/logout',
    method: 'post',
  })
}

export const refreshToken = async () => {
  return service.request<TypeAuth.RefreshTokenResponse>({
    url: '/auth/refresh-token',
    method: 'post',
  })
}

export const getMe = async () => {
  return service.request<{ user: User }>({
    url: '/auth/me',
    method: 'get',
  })
}
