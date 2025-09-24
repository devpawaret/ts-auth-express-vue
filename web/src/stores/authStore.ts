import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import type { User } from '@/types/user'
import type * as TypeAuth from '@/types/auth'
import * as AuthService from '@/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(true)

  const isAuthenticated = computed(() => !!user.value)

  const setUser = (payload: TypeAuth.AuthPayload) => {
    user.value = payload.user
    token.value = payload.accessToken
  }

  const clearAuth = () => {
    user.value = null
    token.value = null
  }

  const register = async (credentials: TypeAuth.RegisterDto) => {
    try {
      const response = await AuthService.register(credentials)
      const { message } = response?.data || {}

      return {
        success: true,
        message,
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'ข้อผิดพลาดภายในเซิร์ฟเวอร์'
      throw new Error(errorMessage)
    }
  }

  const login = async (credentials: TypeAuth.LoginDto) => {
    try {
      const response = await AuthService.login(credentials)
      const data = response?.data || {}

      if (!user || !data.accessToken) throw new Error('ข้อมูลไม่ครบถ้วนจากเซิร์ฟเวอร์')

      setUser({ user: data.user, accessToken: data.accessToken })

      return {
        success: true,
        message: data.message,
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'ข้อผิดพลาดภายในเซิร์ฟเวอร์'
      throw new Error(errorMessage)
    }
  }

  const logout = async () => {
    try {
      const response = await AuthService.logout()
      const { message } = response?.data || {}

      clearAuth()

      return {
        success: true,
        message,
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'ข้อผิดพลาดภายในเซิร์ฟเวอร์'
      throw new Error(errorMessage)
    }
  }

  const refreshToken = async () => {
    try {
      const response = await AuthService.refreshToken()
      const { accessToken } = response?.data || {}

      if (!accessToken) throw new Error('ข้อมูลไม่ครบถ้วนจากเซิร์ฟเวอร์')

      token.value = accessToken

      return {
        success: true,
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'ข้อผิดพลาดภายในเซิร์ฟเวอร์'
      throw new Error(errorMessage)
    } finally {
      isLoading.value = false
    }
  }

  const getMe = async () => {
    try {
      const response = await AuthService.getMe()
      const data = response?.data || {}

      if (!user) throw new Error('ข้อมูลไม่ครบถ้วนจากเซิร์ฟเวอร์')

      user.value = data.user

      return {
        success: true,
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'ข้อผิดพลาดภายในเซิร์ฟเวอร์'
      throw new Error(errorMessage)
    }
  }

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    setUser,
    clearAuth,
    register,
    login,
    logout,
    refreshToken,
    getMe,
  }
})
