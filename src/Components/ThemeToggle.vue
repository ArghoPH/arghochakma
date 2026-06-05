<script setup>
import { ref, watch, onMounted } from 'vue'
import { toggleTheme, getInitialTheme, applyTheme } from '@/utils/theme.js'

const current = ref(getInitialTheme())

onMounted(() => {
  applyTheme(current.value)
})

function handleToggle() {
  current.value = toggleTheme()
}

watch(current, (newTheme) => {
  applyTheme(newTheme)
}, { immediate: true })
</script>

<template>
  <button @click.stop="handleToggle" :aria-pressed="current === 'dark'" class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-600 transition">
    <i v-if="current === 'dark'" class="fa-solid fa-sun text-lg"></i>
    <i v-else class="fa-solid fa-moon text-lg"></i>
  </button>
</template>
