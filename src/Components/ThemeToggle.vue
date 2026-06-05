<script setup>
import { ref } from 'vue'
import { toggleTheme, getInitialTheme, applyTheme } from '@/utils/theme.js'

const current = ref(getInitialTheme())
applyTheme(current.value)

function handleToggle() {
  current.value = toggleTheme()
}
</script>

<template>
  <button @click="handleToggle" :aria-pressed="current === 'dark'" class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none">
    <i v-if="current === 'dark'" class="fa-solid fa-sun"></i>
    <i v-else class="fa-solid fa-moon"></i>
  </button>
</template>
