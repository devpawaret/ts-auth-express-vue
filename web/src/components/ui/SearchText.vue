<script setup lang="ts">
import { SearchIcon, XIcon } from '@/components/icon/outline'

interface Props {
  placeholder?: string
  modelValue: string
  required?: boolean
  minlength?: number
  maxlength?: number
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const clearInput = () => {
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="relative">
    <div class="absolute flex items-center pl-3.5 inset-y-0 left-0">
      <SearchIcon class="mb-0.5 !size-4 md:!size-4.5 text-muted-foreground" />
    </div>

    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      class="block px-10 py-3 w-full text-xs md:text-sm bg-transparent border rounded-xl outline-none transition-all duration-300 placeholder-muted-foreground focus:ring-2 focus-visible:ring-primary"
      @input="handleInput"
    />

    <div v-show="modelValue.length > 0" class="absolute flex items-center pr-1.5 inset-y-0 right-0">
      <button
        type="button"
        class="p-2 text-red-900 outline-none hover:text-red-700 transition-colors"
        @click="clearInput"
      >
        <XIcon class="mb-0.5 !size-4 md:!size-4.5" />
      </button>
    </div>
  </div>
</template>
