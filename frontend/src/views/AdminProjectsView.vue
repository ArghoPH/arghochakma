<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { authService } from '@/services/authService'
import { projectService } from '@/services/projectService'

const router = useRouter()

const projects = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

async function loadProjects() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    projects.value = await projectService.getProjects()
  } catch (error) {
    errorMessage.value = 'Could not load projects.'
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

async function handleDelete(project) {
  const confirmed = confirm(`Delete "${project.title}"?`)

  if (!confirmed) {
    return
  }

  try {
    await projectService.deleteProject(project.id)
    projects.value = projects.value.filter((item) => item.id !== project.id)
  } catch (error) {
    errorMessage.value = 'Could not delete project.'
    console.error(error)
  }
}

function logout() {
  authService.logout()
  router.push('/admin/login')
}

onMounted(loadProjects)
</script>

<template>
  <main class="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
    <section class="container mx-auto">
      <div class="mb-8 flex flex-col justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 md:flex-row md:items-center">
        <div>
          <p class="mb-2 font-semibold text-blue-600 dark:text-blue-400">Admin Panel</p>

          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Manage Projects
          </h1>
        </div>

        <div class="flex flex-wrap gap-3">
          <RouterLink
            to="/projects"
            class="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200"
          >
            View Site
          </RouterLink>

          <button
            @click="logout"
            class="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <p
        v-if="isLoading"
        class="rounded-xl bg-white px-5 py-8 text-center text-gray-600 shadow-sm dark:bg-slate-900 dark:text-slate-300"
      >
        Loading projects...
      </p>

      <p
        v-else-if="errorMessage"
        class="rounded-xl bg-red-50 px-5 py-8 text-center text-red-600 dark:bg-red-950 dark:text-red-300"
      >
        {{ errorMessage }}
      </p>

      <div
        v-else
        class="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-slate-900"
      >
        <table class="w-full min-w-[800px] text-left">
          <thead class="bg-gray-100 text-sm uppercase text-gray-600 dark:bg-slate-800 dark:text-slate-300">
            <tr>
              <th class="px-5 py-4">Title</th>
              <th class="px-5 py-4">Slug</th>
              <th class="px-5 py-4">Featured</th>
              <th class="px-5 py-4">Tech</th>
              <th class="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="project in projects"
              :key="project.id"
              class="border-t border-gray-100 dark:border-slate-800"
            >
              <td class="px-5 py-4 font-semibold text-gray-900 dark:text-white">
                {{ project.title }}
              </td>

              <td class="px-5 py-4 text-gray-600 dark:text-slate-300">
                {{ project.slug }}
              </td>

              <td class="px-5 py-4">
                <span
                  class="rounded-full px-3 py-1 text-sm font-medium"
                  :class="
                    project.isFeatured
                      ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300'
                      : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-300'
                  "
                >
                  {{ project.isFeatured ? 'Yes' : 'No' }}
                </span>
              </td>

              <td class="px-5 py-4 text-gray-600 dark:text-slate-300">
                {{ project.techStack?.join(', ') }}
              </td>

              <td class="px-5 py-4 text-right">
                <button
                  @click="handleDelete(project)"
                  class="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <p
          v-if="!projects.length"
          class="px-5 py-8 text-center text-gray-600 dark:text-slate-300"
        >
          No projects found.
        </p>
      </div>
    </section>
  </main>
</template>
