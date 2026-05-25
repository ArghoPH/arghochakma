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
        class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <img :src="project.image" :alt="project.title" class="h-52 w-full object-cover" />

        <div class="p-6">
            <h3 class="mb-3 text-2xl font-bold text-gray-900">
                {{ project.title }}
            </h3>

            <p class="mb-4 leading-7 text-gray-600">
                {{ project.description }}
            </p>

            <div class="mb-5 flex flex-wrap gap-2">
                <span v-for="item in project.tech" :key="item"
                    class="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                    {{ item }}
                </span>
            </div>

            <div class="flex gap-4">
                <a :href="project.liveLink" target="_blank"
                    class="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700">
                    Live
                    <i class="fa-solid fa-arrow-up-right-from-square ml-1"></i>
                </a>

                <a :href="project.githubLink" target="_blank"
                    class="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600">
                    GitHub
                    <i class="fa-brands fa-github ml-1"></i>
                </a>
            </div>
        </div>
    </div>
</template>