<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id: string
  label: string
  type?: string
  modelValue: string
  error?: string
  required?: boolean
  minlength?: number
  maxlength?: number
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const inputClass = computed(() => [
  'block px-4 py-3 w-full text-sm md:text-base rounded-md outline-1 -outline-offset-1 outline-border placeholder:text-accent focus:outline-2 focus:-outline-offset-2 focus:outline-primary',
  props.error ? 'outline-destructive' : '',
])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div>
    <label :for="id" class="block text-sm font-medium">
      {{ label }}
      <span v-if="required && !modelValue && !error" class="text-destructive">*</span>
      <span v-else-if="error" class="text-destructive">* {{ error }}</span>
    </label>
    <div class="mt-2">
      <input
        :id="id"
        :type="type || 'text'"
        :name="id"
        :value="modelValue"
        :required="required"
        :minlength="minlength"
        :maxlength="maxlength"
        :class="inputClass"
        @input="handleInput"
      />
    </div>
  </div>
</template>
