<script setup>
import { computed, onMounted, ref } from 'vue'

import ProjectCard from '@/Components/ProjectCard.vue'
import { projectService } from '@/services/projectService'

const projects = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

const featuredProjects = computed(() =>
  projects.value.filter((project) => project.isFeatured).slice(0, 3),
)

onMounted(async () => {
  try {
    projects.value = await projectService.getProjects()
  } catch (error) {
    errorMessage.value = 'Could not load featured projects.'
    console.error(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="dark:bg-gray-950">
    <div class="container mx-auto px-4 sm:px-6 py-16">
      <div class="mb-12 text-center">
        <p class="mb-3 font-semibold text-blue-600 dark:text-blue-400">Featured Work</p>

        <h2 class="mb-4 text-3xl font-bold dark:text-white sm:text-4xl">
          Recent Projects
        </h2>

        <p class="mx-auto max-w-2xl leading-7 dark:text-slate-300">
          Here are some of my recent projects loaded dynamically from the backend API.
        </p>
      </div>

      <p
        v-if="isLoading"
        class="rounded-xl bg-gray-50 px-5 py-8 text-center text-gray-600 dark:bg-slate-900 dark:text-slate-300"
      >
        Loading featured projects...
      </p>

      <p
        v-else-if="errorMessage"
        class="rounded-xl bg-red-50 px-5 py-8 text-center text-red-600 dark:bg-red-950 dark:text-red-300"
      >
        {{ errorMessage }}
      </p>

      <div v-else-if="featuredProjects.length" class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          v-for="project in featuredProjects"
          :key="project.id"
          :project="project"
        />
      </div>

      <p
        v-else
        class="rounded-xl bg-gray-50 px-5 py-8 text-center text-gray-600 dark:bg-slate-900 dark:text-slate-300"
      >
        No featured projects found.
      </p>

      <div class="mt-10 text-center">
        <RouterLink
          to="/projects"
          class="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          View All Projects
          <i class="fa-solid fa-arrow-right ml-2"></i>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
