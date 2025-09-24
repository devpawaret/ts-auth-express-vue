import service from '@/utils/request'
import type { User } from '@/types/user'

export const getMe = async () => {
  return service.request<{ user: User }>({
    url: '/auth/me',
    method: 'get',
  })
}

export const getAllUser = async () => {
  return service.request<{ users: User[] }>({
    url: '/user/users',
    method: 'get',
  })
}
