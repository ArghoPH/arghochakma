<script setup>
import { ref, watch } from 'vue'
import { toggleTheme, getInitialTheme, applyTheme } from '@/utils/theme.js'

// `main.js` applies the initial theme before mount; keep local state in sync
const current = ref(getInitialTheme())

function handleToggle() {
  current.value = toggleTheme()
}

// Apply theme only when user toggles (avoid double-applying on mount)
watch(current, (newTheme) => {
  applyTheme(newTheme)
})
</script>

<template>
  <button @click.stop="handleToggle" :aria-pressed="current === 'dark'" class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-600 transition">
    <i v-if="current === 'dark'" class="fa-solid fa-sun text-lg"></i>
    <i v-else class="fa-solid fa-moon text-lg"></i>
  </button>
</template>
