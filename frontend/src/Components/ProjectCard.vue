<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

function decodeHtml(value) {
  if (!value) {
    return ''
  }

  const textarea = document.createElement('textarea')
  textarea.innerHTML = value
  return textarea.value
}

function stripHtmlToText(value) {
  if (!value || typeof value !== 'string') {
    return ''
  }

  const withoutTags = value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>/gi, ' ')
    .replace(/<\/div>/gi, ' ')
    .replace(/<\/li>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')

  return decodeHtml(withoutTags)
    .replace(/\s+/g, ' ')
    .trim()
}

const shortDescription = computed(() => {
  const text = stripHtmlToText(props.project.description)
  const maxLength = 160

  if (text.length <= maxLength) {
    return text
  }

  return `${text.slice(0, maxLength).trim()}...`
})

const visibleTechStack = computed(() => {
  return Array.isArray(props.project.techStack)
    ? props.project.techStack.slice(0, 5)
    : []
})

const extraTechCount = computed(() => {
  return Array.isArray(props.project.techStack) && props.project.techStack.length > 5
    ? props.project.techStack.length - 5
    : 0
})
</script>

<template>
  <article
    class="group overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900">
    <RouterLink :to="`/projects/${project.slug}`" class="block overflow-hidden bg-black">
      <img :src="project.imageUrl || '/images/ecommerce-website.png'" :alt="project.title"
        class="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
    </RouterLink>

    <div class="p-6">
      <div class="mb-4 flex flex-wrap gap-2">
        <span v-for="tech in visibleTechStack" :key="tech"
          class="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-slate-800 dark:text-blue-300">
          {{ tech }}
        </span>

        <span v-if="extraTechCount"
          class="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 dark:bg-slate-800 dark:text-slate-300">
          +{{ extraTechCount }}
        </span>
      </div>

      <RouterLink :to="`/projects/${project.slug}`">
        <h3
          class="mb-3 text-2xl font-bold text-gray-900 transition hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
          {{ project.title }}
        </h3>
      </RouterLink>

      <p class="mb-6 min-h-[84px] text-gray-600 dark:text-slate-300">
        {{ shortDescription || 'No description available.' }}
      </p>

      <div class="flex flex-wrap gap-3">
        <RouterLink :to="`/projects/${project.slug}`"
          class="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700">
          Details
        </RouterLink>

        <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer"
          class="rounded-xl border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200">
          <i class="fa-solid fa-arrow-up-right-from-square mr-2"></i>
          Live
        </a>

        <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer"
          class="rounded-xl border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200">
          <i class="fa-brands fa-github mr-2"></i>GitHub
        </a>
      </div>
    </div>
  </article>
</template>
