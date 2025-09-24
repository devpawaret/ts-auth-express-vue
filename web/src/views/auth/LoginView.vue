<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables'

import { Input, Button, TextWithLink } from '@/components/ui'

import type { LoginDto, LoginErrorDto } from '@/types/auth'
import { useAuthStore } from '@/stores/authStore'

import { validateUsername, validatePassword } from '@/utils/validations'

const router = useRouter()
const { toast } = useToast()
const authStore = useAuthStore()

const formData = reactive<LoginDto>({
  username: '',
  password: '',
})
const formError = reactive<LoginErrorDto>({})
const isLoading = ref(false)

const usernameError = computed(() => validateUsername(formData.username))
const passwordError = computed(() => validatePassword(formData.password))

const isFormDisabled = computed(
  () => isLoading.value || !!(usernameError.value || passwordError.value),
)

const handleLogin = async () => {
  if (isFormDisabled.value) return
  isLoading.value = true

  try {
    const result = await authStore.login(formData)
    if (!result.success) return toast.error(result.message)

    router.push('/')
    toast.success(result.message)
  } catch (err: any) {
    toast.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <div class="text-center">
      <h2 class="mt-10 text-xl md:text-2xl font-semibold tracking-tight">ลงชื่อเข้าใช้</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <Input
          id="username"
          label="ชื่อผู้ใช้"
          type="text"
          v-model="formData.username"
          :error="formError.username"
          :minlength="4"
          :maxlength="50"
          required
          @input="formError.username = validateUsername(formData.username)"
        />

        <Input
          id="password"
          label="รหัสผ่าน"
          type="password"
          v-model="formData.password"
          :error="formError.password"
          :minlength="6"
          :maxlength="50"
          required
          @input="formError.password = validatePassword(formData.password)"
        />

        <Button :disabled="isFormDisabled" :loading="isLoading" @click.prevent="handleLogin">
          เข้าสู่ระบบ
        </Button>
      </form>

      <div class="mt-10 text-center">
        <TextWithLink to="/register" text="ยังไม่มีบัญชี?" link-text="สมัครตอนนี้เลย" />
      </div>
    </div>
  </div>
</template>
