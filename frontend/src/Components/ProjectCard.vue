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
  const maxLength = 150

  if (text.length <= maxLength) {
    return text
  }

  return `${text.slice(0, maxLength).trim()}...`
})

const visibleTechStack = computed(() => {
  if (!Array.isArray(props.project.techStack)) {
    return []
  }

  return props.project.techStack.slice(0, 4)
})

const extraTechCount = computed(() => {
  if (!Array.isArray(props.project.techStack)) {
    return 0
  }

  return props.project.techStack.length > 4
    ? props.project.techStack.length - 4
    : 0
})
</script>

<template>
  <article class="project-card group">
    <RouterLink
      :to="`/projects/${project.slug}`"
      class="relative block overflow-hidden bg-black"
      :aria-label="`View ${project.title}`"
    >
      <img
        :src="project.imageUrl || '/images/ecommerce-website.png'"
        :alt="project.title"
        class="h-48 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-56"
      />

      <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80"></div>

      <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-3">
        <span
          v-if="project.isFeatured"
          class="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow"
        >
          Featured
        </span>

        <span
          v-else
          class="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur"
        >
          Project
        </span>

        <span class="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </span>
      </div>
    </RouterLink>

    <div class="p-5 sm:p-6">
      <div class="mb-4 flex flex-wrap gap-2">
        <span
          v-for="tech in visibleTechStack"
          :key="tech"
          class="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:bg-slate-800 dark:text-blue-300 sm:text-sm"
        >
          {{ tech }}
        </span>

        <span
          v-if="extraTechCount"
          class="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600 dark:bg-slate-800 dark:text-slate-300 sm:text-sm"
        >
          +{{ extraTechCount }}
        </span>
      </div>

      <RouterLink :to="`/projects/${project.slug}`">
        <h3 class="project-card-title">
          {{ project.title }}
        </h3>
      </RouterLink>

      <p class="project-card-description">
        {{ shortDescription || 'No description available.' }}
      </p>

      <div class="mt-5 flex items-center gap-2 sm:gap-3">
        <RouterLink
          :to="`/projects/${project.slug}`"
          title="Details"
          aria-label="Details"
          class="project-action-btn bg-blue-600 text-white hover:bg-blue-700"
        >
          <i class="fa-solid fa-circle-info"></i>
          <span class="hidden sm:inline">Details</span>
        </RouterLink>

        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          title="Live Project"
          aria-label="Live Project"
          class="project-action-btn border border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200"
        >
          <i class="fa-solid fa-globe"></i>
          <span class="hidden sm:inline">Live</span>
        </a>

        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          aria-label="GitHub"
          class="project-action-btn border border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200"
        >
          <i class="fa-brands fa-github"></i>
          <span class="hidden sm:inline">GitHub</span>
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  overflow: hidden;
  border-radius: 1.75rem;
  background: white;
  box-shadow: 0 12px 35px rgba(15, 23, 42, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.14);
}

.project-card-title {
  display: -webkit-box;
  margin-bottom: 0.75rem;
  overflow: hidden;
  color: #111827;
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.25;
  transition: color 0.2s ease;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.project-card-title:hover {
  color: #2563eb;
}

.project-card-description {
  display: -webkit-box;
  min-height: 4.9rem;
  overflow: hidden;
  color: #4b5563;
  font-size: 0.95rem;
  line-height: 1.65;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.project-action-btn {
  display: inline-flex;
  height: 2.75rem;
  min-width: 2.75rem;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.95rem;
  font-size: 0.95rem;
  font-weight: 800;
  transition: 0.2s ease;
}

@media (min-width: 640px) {
  .project-action-btn {
    width: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (max-width: 639px) {
  .project-card {
    border-radius: 1.5rem;
  }

  .project-card-title {
    font-size: 1.2rem;
  }

  .project-card-description {
    min-height: 4.4rem;
    font-size: 0.9rem;
    -webkit-line-clamp: 3;
  }
}

@media (prefers-color-scheme: dark) {
  .project-card {
    background: #0f172a;
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
  }

  .project-card-title {
    color: #ffffff;
  }

  .project-card-title:hover {
    color: #60a5fa;
  }

  .project-card-description {
    color: #cbd5e1;
  }
}
</style>
