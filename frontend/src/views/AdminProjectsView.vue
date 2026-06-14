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
    errorMessage.value = error.message || 'Could not load projects.'
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
    errorMessage.value = error.message || 'Could not delete project.'
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
  <main class="min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-950 sm:px-6 lg:px-8">
    <section class="container mx-auto max-w-7xl">
      <div class="mb-8 rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-900 sm:p-6">
        <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="mb-2 text-sm font-semibold tracking-wide text-blue-600 dark:text-blue-400">
              Admin Panel
            </p>

            <h1 class="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Manage Projects
            </h1>
          </div>

          <div class="flex flex-wrap gap-3">
            <RouterLink
              to="/admin/projects/create"
              title="Create Project"
              aria-label="Create Project"
              class="admin-icon-btn bg-blue-600 text-white hover:bg-blue-700"
            >
              <i class="fa-solid fa-plus"></i>
            </RouterLink>

            <RouterLink
              to="/projects"
              title="View Site"
              aria-label="View Site"
              class="admin-icon-btn border border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200"
            >
              <i class="fa-solid fa-eye"></i>
            </RouterLink>

            <button
              type="button"
              @click="logout"
              title="Logout"
              aria-label="Logout"
              class="admin-icon-btn bg-red-600 text-white hover:bg-red-700"
            >
              <i class="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </div>

      <p
        v-if="isLoading"
        class="rounded-2xl bg-white px-5 py-8 text-center text-gray-600 shadow-sm dark:bg-slate-900 dark:text-slate-300"
      >
        Loading projects...
      </p>

      <p
        v-else-if="errorMessage"
        class="rounded-2xl bg-red-50 px-5 py-8 text-center text-red-600 dark:bg-red-950 dark:text-red-300"
      >
        {{ errorMessage }}
      </p>

      <template v-else>
        <div class="hidden overflow-x-auto rounded-3xl bg-white shadow-sm dark:bg-slate-900 lg:block">
          <table class="w-full min-w-[1100px] text-left">
            <thead class="bg-gray-100 text-sm uppercase text-gray-600 dark:bg-slate-800 dark:text-slate-300">
              <tr>
                <th class="px-5 py-4">Title</th>
                <th class="px-5 py-4">Slug</th>
                <th class="px-5 py-4">Featured</th>
                <th class="px-5 py-4">Tech</th>
                <th class="px-5 py-4">Links</th>
                <th class="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="project in projects"
                :key="project.id"
                class="border-t border-gray-100 dark:border-slate-800"
              >
                <td class="px-5 py-4">
                  <div class="flex items-center gap-3">
                    <img
                      :src="project.imageUrl || '/images/ecommerce-website.png'"
                      :alt="project.title"
                      class="h-14 w-20 rounded-xl object-cover"
                    />

                    <p class="max-w-[220px] font-semibold text-gray-900 dark:text-white">
                      {{ project.title }}
                    </p>
                  </div>
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
                  <div class="flex max-w-xs flex-wrap gap-2">
                    <span
                      v-for="tech in project.techStack"
                      :key="tech"
                      class="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 dark:bg-slate-800 dark:text-blue-300"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </td>

                <td class="px-5 py-4">
                  <div class="flex flex-wrap gap-2">
                    <RouterLink
                      :to="`/projects/${project.slug}`"
                      title="View Details"
                      aria-label="View Details"
                      class="mini-icon-btn bg-blue-600 text-white hover:bg-blue-700"
                    >
                      <i class="fa-solid fa-eye"></i>
                    </RouterLink>

                    <a
                      v-if="project.liveUrl"
                      :href="project.liveUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Live Project"
                      aria-label="Live Project"
                      class="mini-icon-btn bg-green-600 text-white hover:bg-green-700"
                    >
                      <i class="fa-solid fa-globe"></i>
                    </a>

                    <a
                      v-if="project.githubUrl"
                      :href="project.githubUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub"
                      aria-label="GitHub"
                      class="mini-icon-btn bg-slate-800 text-white hover:bg-slate-900"
                    >
                      <i class="fa-brands fa-github"></i>
                    </a>
                  </div>
                </td>

                <td class="px-5 py-4">
                  <div class="flex justify-end gap-2">
                    <RouterLink
                      :to="`/admin/projects/edit/${project.id}`"
                      title="Edit Project"
                      aria-label="Edit Project"
                      class="mini-icon-btn bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                      <i class="fa-solid fa-pen-to-square"></i>
                    </RouterLink>

                    <button
                      type="button"
                      @click="handleDelete(project)"
                      title="Delete Project"
                      aria-label="Delete Project"
                      class="mini-icon-btn bg-red-600 text-white hover:bg-red-700"
                    >
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
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

        <div class="grid gap-4 lg:hidden">
          <article
            v-for="project in projects"
            :key="project.id"
            class="rounded-3xl bg-white p-4 shadow-sm dark:bg-slate-900"
          >
            <div class="flex gap-4">
              <img
                :src="project.imageUrl || '/images/ecommerce-website.png'"
                :alt="project.title"
                class="h-24 w-28 flex-shrink-0 rounded-2xl object-cover sm:h-28 sm:w-36"
              />

              <div class="min-w-0 flex-1">
                <h2 class="line-clamp-2 font-bold text-gray-900 dark:text-white">
                  {{ project.title }}
                </h2>

                <p class="mt-1 break-all text-sm text-gray-500 dark:text-slate-400">
                  {{ project.slug }}
                </p>

                <span
                  class="mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium"
                  :class="
                    project.isFeatured
                      ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300'
                      : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-300'
                  "
                >
                  {{ project.isFeatured ? 'Featured' : 'Normal' }}
                </span>
              </div>
            </div>

            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tech in project.techStack"
                :key="tech"
                class="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 dark:bg-slate-800 dark:text-blue-300"
              >
                {{ tech }}
              </span>
            </div>

            <div class="mt-5 flex flex-wrap justify-between gap-3">
              <div class="flex flex-wrap gap-2">
                <RouterLink
                  :to="`/projects/${project.slug}`"
                  title="View Details"
                  aria-label="View Details"
                  class="mini-icon-btn bg-blue-600 text-white hover:bg-blue-700"
                >
                  <i class="fa-solid fa-eye"></i>
                </RouterLink>

                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Live Project"
                  aria-label="Live Project"
                  class="mini-icon-btn bg-green-600 text-white hover:bg-green-700"
                >
                  <i class="fa-solid fa-globe"></i>
                </a>

                <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  aria-label="GitHub"
                  class="mini-icon-btn bg-slate-800 text-white hover:bg-slate-900"
                >
                  <i class="fa-brands fa-github"></i>
                </a>
              </div>

              <div class="flex flex-wrap gap-2">
                <RouterLink
                  :to="`/admin/projects/edit/${project.id}`"
                  title="Edit Project"
                  aria-label="Edit Project"
                  class="mini-icon-btn bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                </RouterLink>

                <button
                  type="button"
                  @click="handleDelete(project)"
                  title="Delete Project"
                  aria-label="Delete Project"
                  class="mini-icon-btn bg-red-600 text-white hover:bg-red-700"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </article>

          <p
            v-if="!projects.length"
            class="rounded-2xl bg-white px-5 py-8 text-center text-gray-600 shadow-sm dark:bg-slate-900 dark:text-slate-300"
          >
            No projects found.
          </p>
        </div>
      </template>
    </section>
  </main>
</template>

<style scoped>
.admin-icon-btn {
  display: inline-flex;
  height: 3rem;
  width: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  font-size: 1.05rem;
  font-weight: 800;
  transition: 0.2s;
}

.mini-icon-btn {
  display: inline-flex;
  height: 2.35rem;
  width: 2.35rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  font-size: 0.9rem;
  font-weight: 800;
  transition: 0.2s;
}
</style>

