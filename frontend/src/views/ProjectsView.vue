<script setup>
import { computed, onMounted, ref } from 'vue'

import ProjectCard from '@/Components/ProjectCard.vue'
import { projectService } from '@/services/projectService'

const projects = ref([])
const selectedCategory = ref('All')
const isLoading = ref(true)
const errorMessage = ref('')

const categories = computed(() => {
  const allTech = projects.value.flatMap((project) => project.techStack || [])
  return ['All', ...new Set(allTech)]
})

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'All') {
    return projects.value
  }

  return projects.value.filter((project) =>
    project.techStack?.includes(selectedCategory.value),
  )
})

onMounted(async () => {
  try {
    projects.value = await projectService.getProjects()
  } catch (error) {
    errorMessage.value = 'Could not load projects from the API.'
    console.error(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main class="bg-white dark:bg-gray-950">
    <section class="container mx-auto px-4 sm:px-6 py-16">
      <div class="mb-10 text-center">
        <p class="mb-3 font-semibold text-blue-600 dark:text-blue-400">My Work</p>

        <h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
          Projects
        </h1>

        <p class="mx-auto max-w-2xl leading-7 text-gray-600 dark:text-slate-300">
          Here are some of the projects I have built using modern frontend and backend tools.
        </p>
      </div>

      <p v-if="isLoading"
        class="rounded-xl bg-gray-50 px-5 py-8 text-center text-gray-600 dark:bg-slate-900 dark:text-slate-300">
        Syncing projects...
      </p>

      <p v-else-if="errorMessage"
        class="rounded-xl bg-red-50 px-5 py-8 text-center text-red-600 dark:bg-red-950 dark:text-red-300">
        {{ errorMessage }}
      </p>

      <template v-else>
        <div v-if="projects.length" class="mb-10 flex flex-wrap justify-center gap-3">
          <button v-for="category in categories" :key="category" @click="selectedCategory = category"
            class="rounded-full border px-5 py-2 font-medium transition" :class="selectedCategory === category
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:text-blue-300'
              ">
            {{ category }}
          </button>
        </div>

        <div v-if="filteredProjects.length" class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" />
        </div>

        <p v-else
          class="rounded-xl bg-gray-50 px-5 py-8 text-center text-gray-600 dark:bg-slate-900 dark:text-slate-300">
          No projects found.
        </p>
      </template>
    </section>
  </main>
</template>
