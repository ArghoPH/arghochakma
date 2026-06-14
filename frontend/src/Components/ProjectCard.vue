<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div
    class="overflow-hidden rounded-2xl border-2 border-slate-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
  >
    <RouterLink :to="`/projects/${project.slug}`">
      <img
        :src="project.imageUrl || '/images/ecommerce-website.png'"
        :alt="project.title"
        class="w-full object-cover h-44 sm:h-52 md:h-56 lg:h-48 xl:h-52"
      />
    </RouterLink>

    <div class="p-6">
      <RouterLink :to="`/projects/${project.slug}`">
        <h3 class="mb-3 text-2xl font-bold transition hover:text-blue-600 dark:text-white">
          {{ project.title }}
        </h3>
      </RouterLink>

      <p class="mb-4 leading-7 dark:text-slate-300">
        {{ project.description }}
      </p>

      <div class="mb-5 flex flex-wrap gap-2">
        <span
          v-for="item in project.techStack"
          :key="item"
          class="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-slate-800 dark:text-blue-300"
        >
          {{ item }}
        </span>
      </div>

      <div class="flex flex-wrap gap-4">
        <RouterLink
          :to="`/projects/${project.slug}`"
          class="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Details
          <i class="fa-solid fa-arrow-right ml-1"></i>
        </RouterLink>

        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200 dark:hover:text-blue-300"
        >
          Live
          <i class="fa-solid fa-arrow-up-right-from-square ml-1"></i>
        </a>

        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200 dark:hover:text-blue-300"
        >
          GitHub
          <i class="fa-brands fa-github ml-1"></i>
        </a>
      </div>
    </div>
  </div>
</template>
