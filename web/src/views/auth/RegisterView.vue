<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables'

import { Input, Button, TextWithLink } from '@/components/ui'

import type { RegisterDto, RegisterErrorDto } from '@/types/auth'
import { useAuthStore } from '@/stores/authStore'

import { validateUsername, validatePassword, validateConfirmPassword } from '@/utils/validations'

const router = useRouter()
const { toast } = useToast()
const authStore = useAuthStore()

const formData = reactive<RegisterDto>({
  username: '',
  password: '',
  confirmPassword: '',
})
const formError = reactive<RegisterErrorDto>({})
const isLoading = ref(false)

const usernameError = computed(() => validateUsername(formData.username))
const passwordError = computed(() => validatePassword(formData.password))
const confirmPasswordError = computed(() =>
  validateConfirmPassword(formData.password, formData.confirmPassword),
)

const isFormDisabled = computed(
  () =>
    isLoading.value || !!(usernameError.value || passwordError.value || confirmPasswordError.value),
)

const handleRegister = async () => {
  if (isFormDisabled.value) return
  isLoading.value = true

  try {
    const result = await authStore.register(formData)

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
      <h2 class="mt-10 text-xl md:text-2xl font-semibold tracking-tight">สร้างบัญชีใหม่</h2>
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

        <Input
          id="confirm-password"
          label="ยืนยันรหัสผ่าน"
          type="password"
          v-model="formData.confirmPassword"
          :error="formError.confirmPassword"
          :minlength="6"
          :maxlength="50"
          required
          @input="
            formError.confirmPassword = validateConfirmPassword(
              formData.password,
              formData.confirmPassword,
            )
          "
        />

        <Button :disabled="isFormDisabled" :loading="isLoading" @click.prevent="handleRegister">
          สมัครสมาชิก
        </Button>
      </form>

      <div class="mt-10 text-center">
        <TextWithLink to="/login" text="มีบัญชีอยู่แล้ว?" link-text="เข้าสู่ระบบตอนนี้เลย" />
      </div>
    </div>
  </div>
</template>
