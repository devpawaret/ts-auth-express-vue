<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import * as IconAnimation from '@/components/icon/animation'
import { SearchText } from '@/components/ui'

import { useListStore } from '@/stores/listStore'

const listStore = useListStore()

const searchList = ref('')

const filteredLists = computed(() => {
  const search = searchList.value.toLowerCase()
  if (!search) return listStore.lists
  return listStore.lists?.filter((item) => item.username.toLowerCase().includes(search))
})

onMounted(async () => {
  await listStore.fetchList()
})
</script>

<template>
  <div>
    <div class="text-center">
      <h2 class="mt-10 text-xl md:text-2xl font-semibold tracking-tight">รายชื่อผู้ใช้ทั้งหมด</h2>
    </div>

    <div class="mx-auto mt-8 max-w-md">
      <SearchText v-model="searchList" />
    </div>

    <div class="mx-auto mt-10 max-w-7xl">
      <div v-if="listStore.isLoading" class="grid place-content-center">
        <IconAnimation.LoadingIcon class="!size-8 text-primary dark:text-primary-foreground" />
      </div>

      <ul
        v-else-if="filteredLists && filteredLists.length > 0"
        :key="searchList"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
      >
        <li
          v-for="(item, index) in filteredLists"
          :style="{ animationDelay: `${index * 100}ms` }"
          class="flex flex-col overflow-hidden w-full bg-background/80 dark:bg-background/40 border rounded-2xl backdrop-blur drop-shadow-2xl transition-all duration-300 animate-fade-in opacity-0"
        >
          <div
            class="relative overflow-hidden aspect-square border-b transition-transform duration-400 group-hover:scale-105"
          >
            <img
              :src="`./assets/images/avatar-v1.png`"
              alt="Avatar"
              class="pointer-events-none w-full h-full object-cover"
            />
          </div>
          <div class="flex flex-col flex-grow p-4 tracking-tight">
            <div class="flex items-center justify-between mb-2 text-base font-bold">
              <h1 class="flex-1 leading-normal truncate">
                {{ item.username }}
              </h1>
              <h2 class="ml-4 text-green-600 dark:text-green-700 text-lg leading-normal truncate">
                {{ item.role }}
              </h2>
            </div>
          </div>
        </li>
      </ul>

      <p v-else class="text-muted-foreground text-center">ไม่พบผู้ใข้</p>
    </div>
  </div>
</template>
