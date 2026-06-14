<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { authService } from '@/services/authService'

const router = useRouter()

const username = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  errorMessage.value = ''
  isLoading.value = true

  try {
    await authService.login(username.value, password.value)
    router.push('/admin/projects')
  } catch (error) {
    errorMessage.value = 'Invalid admin username or password.'
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="min-h-screen bg-gray-50 px-4 py-16 dark:bg-gray-950">
    <section class="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-lg dark:bg-slate-900">
      <div class="mb-8 text-center">
        <p class="mb-2 font-semibold text-blue-600 dark:text-blue-400">Admin Panel</p>

        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Login
        </h1>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="mb-2 block font-medium text-gray-700 dark:text-slate-200">
            Username
          </label>
          <input
            v-model="username"
            type="text"
            required
            class="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            placeholder="admin"
          />
        </div>

        <div>
          <label class="mb-2 block font-medium text-gray-700 dark:text-slate-200">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            placeholder="Admin password"
          />
        </div>

        <p
          v-if="errorMessage"
          class="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-300"
        >
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </section>
  </main>
</template>
