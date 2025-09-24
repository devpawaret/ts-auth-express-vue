<script setup lang="ts">
import * as IconAnimation from '@/components/icon/animation'

interface Props {
  disabled?: boolean
  loading?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <button
    type="button"
    :disabled="disabled || loading"
    class="flex justify-center px-4 py-3 w-full text-white text-sm md:text-base bg-primary rounded-md transition-all duration-300"
    :class="disabled || loading ? 'opacity-60' : 'opacity-100 hover:bg-primary-foreground'"
  >
    <template v-if="loading">
      <span class="flex items-center gap-1.5">
        <IconAnimation.LoadingIcon />
        รอสักครู่...
      </span>
    </template>
    <template v-else>
      <slot />
    </template>
  </button>
</template>
