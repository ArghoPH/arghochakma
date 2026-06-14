<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { projectService } from '@/services/projectService'

const route = useRoute()

const project = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  try {
    project.value = await projectService.getProjectBySlug(route.params.slug)
  } catch (error) {
    errorMessage.value = 'Could not load project details.'
    console.error(error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <main class="bg-white dark:bg-gray-950">
    <section class="container mx-auto px-4 sm:px-6 py-16">
      <RouterLink
        to="/projects"
        class="mb-8 inline-flex items-center font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
      >
        <i class="fa-solid fa-arrow-left mr-2"></i>
        Back to Projects
      </RouterLink>

      <p
        v-if="isLoading"
        class="rounded-xl bg-gray-50 px-5 py-8 text-center text-gray-600 dark:bg-slate-900 dark:text-slate-300"
      >
        Loading project details...
      </p>

      <p
        v-else-if="errorMessage"
        class="rounded-xl bg-red-50 px-5 py-8 text-center text-red-600 dark:bg-red-950 dark:text-red-300"
      >
        {{ errorMessage }}
      </p>

      <article v-else-if="project" class="mx-auto max-w-5xl">
        <img
          :src="project.imageUrl || '/images/ecommerce-website.png'"
          :alt="project.title"
          class="mb-10 h-72 w-full rounded-3xl object-cover shadow-lg md:h-[420px]"
        />

        <div class="mb-6 flex flex-wrap gap-2">
          <span
            v-for="item in project.techStack"
            :key="item"
            class="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-slate-800 dark:text-blue-300"
          >
            {{ item }}
          </span>
        </div>

        <h1 class="mb-5 text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
          {{ project.title }}
        </h1>

        <p class="mb-8 text-lg leading-8 text-gray-600 dark:text-slate-300">
          {{ project.description }}
        </p>

        <div class="flex flex-wrap gap-4">
          <a
            v-if="project.liveUrl"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            View Live
            <i class="fa-solid fa-arrow-up-right-from-square ml-1"></i>
          </a>

          <a
            v-if="project.githubUrl"
            :href="project.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200 dark:hover:text-blue-300"
          >
            GitHub
            <i class="fa-brands fa-github ml-1"></i>
          </a>
        </div>
      </article>
    </section>
  </main>
</template>
