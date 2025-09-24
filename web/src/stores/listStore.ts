import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { User } from '@/types/user'
import { getAllUser } from '@/services/user.service'

export const useListStore = defineStore('list', () => {
  const lists = ref<User[] | null>(null)
  const isLoading = ref(true)

  const fetchList = async () => {
    if (lists.value && lists.value.length > 0) return

    try {
      const response = await getAllUser()
      const { users } = response?.data || {}

      if (!users) throw new Error('ข้อมูลไม่ครบถ้วนจากเซิร์ฟเวอร์')

      lists.value = users

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

  return { lists, isLoading, fetchList }
})
