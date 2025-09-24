import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
})

service.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    const token = authStore.token

    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
  },
  (error) => Promise.reject(error),
)

// service.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const authStore = useAuthStore()
//     const originalRequest = error.config

//     // ถ้าเจอ 401 และยังไม่ได้ลอง refreshToken มาก่อน
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true
//       try {
//         const refreshResult = await authStore.refreshToken()
//         if (refreshResult.success) {
//           // retry request หลัง refresh สำเร็จ
//           originalRequest.headers.Authorization = `Bearer ${authStore.token}`
//           return service(originalRequest)
//         }
//       } catch (refreshError) {
//         authStore.clearAuth()
//       }
//     }

//     return Promise.reject(error)
//   },
// )

export default service
