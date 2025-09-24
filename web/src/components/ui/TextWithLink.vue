<script setup lang="ts">
interface Props {
  text: string
  linkText: string
  to: string
}

const props = defineProps<Props>()
</script>

<template>
  <p class="text-sm">
    {{ text }}
    <RouterLink :to="to" class="text-primary hover:text-primary-foreground">
      {{ linkText }}
    </RouterLink>
  </p>
</template>
