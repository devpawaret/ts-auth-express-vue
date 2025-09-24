import { ref } from 'vue'

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

const toasts = ref<Toast[]>([])

const useToast = () => {
  const addToast = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Date.now()

    toasts.value.push({ id, message, type })

    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    }, 3000)
  }

  const toast = {
    success: (message: string) => addToast(message, 'success'),
    error: (message: string) => addToast(message, 'error'),
    info: (message: string) => addToast(message, 'info'),
  }

  return { toasts, toast }
}

export default useToast
