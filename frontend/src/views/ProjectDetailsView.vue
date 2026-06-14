<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { projectService } from '@/services/projectService'

const route = useRoute()

const project = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')
const activeImageIndex = ref(0)

const galleryImages = computed(() => {
  if (!project.value) {
    return []
  }

  const images = []

  if (project.value.imageUrl) {
    images.push({
      url: project.value.imageUrl,
      label: 'Cover Image'
    })
  }

  if (Array.isArray(project.value.galleryImageUrls)) {
    project.value.galleryImageUrls.forEach((url, index) => {
      images.push({
        url,
        label: `Project Image ${index + 1}`
      })
    })
  }

  return images
})

const activeImage = computed(() => {
  return galleryImages.value[activeImageIndex.value] || null
})

function goToPreviousImage() {
  if (!galleryImages.value.length) {
    return
  }

  activeImageIndex.value =
    activeImageIndex.value === 0
      ? galleryImages.value.length - 1
      : activeImageIndex.value - 1
}

function goToNextImage() {
  if (!galleryImages.value.length) {
    return
  }

  activeImageIndex.value =
    activeImageIndex.value === galleryImages.value.length - 1
      ? 0
      : activeImageIndex.value + 1
}

async function loadProject() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    project.value = await projectService.getProjectBySlug(route.params.slug)
  } catch (error) {
    errorMessage.value = error.message || 'Could not load project.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadProject)
</script>

<template>
  <main class="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
    <section class="container mx-auto max-w-6xl">
      <p
        v-if="isLoading"
        class="rounded-xl bg-white px-5 py-8 text-center text-gray-600 shadow-sm dark:bg-slate-900 dark:text-slate-300"
      >
        Loading project...
      </p>

      <p
        v-else-if="errorMessage"
        class="rounded-xl bg-red-50 px-5 py-8 text-center text-red-600 dark:bg-red-950 dark:text-red-300"
      >
        {{ errorMessage }}
      </p>

      <article
        v-else-if="project"
        class="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-slate-900"
      >
        <div class="p-6 md:p-10">
          <RouterLink
            to="/projects"
            class="mb-6 inline-flex rounded-xl border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200"
          >
            Back to Projects
          </RouterLink>

          <h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            {{ project.title }}
          </h1>

          <div class="mb-8 flex flex-wrap gap-2">
            <span
              v-for="tech in project.techStack"
              :key="tech"
              class="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-slate-800 dark:text-blue-300"
            >
              {{ tech }}
            </span>
          </div>

          <div
            v-if="galleryImages.length"
            class="mb-10 rounded-3xl border border-gray-200 p-4 dark:border-slate-800"
          >
            <div class="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                  Project Gallery
                </h2>

                <p class="text-sm text-gray-500 dark:text-slate-400">
                  {{ activeImage?.label }}
                  · {{ activeImageIndex + 1 }} / {{ galleryImages.length }}
                </p>
              </div>

              <div
                v-if="galleryImages.length > 1"
                class="flex gap-2"
              >
                <button
                  type="button"
                  @click="goToPreviousImage"
                  class="rounded-xl bg-gray-100 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-slate-800 dark:text-white"
                >
                  Previous
                </button>

                <button
                  type="button"
                  @click="goToNextImage"
                  class="rounded-xl bg-gray-100 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-slate-800 dark:text-white"
                >
                  Next
                </button>
              </div>
            </div>

            <img
              v-if="activeImage"
              :src="activeImage.url"
              :alt="activeImage.label"
              class="mb-4 h-[420px] w-full rounded-2xl object-cover"
            />

            <div
              v-if="galleryImages.length > 1"
              class="grid gap-3 sm:grid-cols-3 md:grid-cols-5"
            >
              <button
                v-for="(image, index) in galleryImages"
                :key="image.url"
                type="button"
                @click="activeImageIndex = index"
                class="rounded-xl border p-2 text-left transition"
                :class="index === activeImageIndex ? 'border-blue-600' : 'border-gray-200 dark:border-slate-800'"
              >
                <img
                  :src="image.url"
                  :alt="image.label"
                  class="mb-2 h-24 w-full rounded-lg object-cover"
                />

                <p class="text-xs font-semibold text-gray-700 dark:text-slate-200">
                  {{ image.label }}
                </p>
              </button>
            </div>
          </div>

          <div class="prose max-w-none dark:prose-invert">
            <p class="whitespace-pre-line text-lg leading-8 text-gray-600 dark:text-slate-300">
              {{ project.description }}
            </p>
          </div>

          <div class="mt-10 flex flex-wrap gap-3">
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Visit Live Project
            </a>

            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200"
            >
              View GitHub
            </a>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>
