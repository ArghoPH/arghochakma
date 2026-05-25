<script setup>
import { ref, computed } from 'vue'
import { projects } from '@/data/projects'
import ProjectCard from '@/Components/ProjectCard.vue'

const selectedCategory = ref('All')

const categories = computed(() => {
    const allTech = projects.flatMap((project) => project.tech)
    return ['All', ...new Set(allTech)]
})

const filteredProjects = computed(() => {
    if (selectedCategory.value === 'All') {
        return projects
    }

    return projects.filter((project) =>
        project.tech.includes(selectedCategory.value)
    )
})
</script>

<template>
    <main class="bg-white">
        <section class="mx-auto max-w-6xl px-5 py-16">
            <!-- Heading -->
            <div class="mb-10 text-center">
                <p class="mb-3 font-semibold text-blue-600">My Work</p>

                <h1 class="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
                    Projects
                </h1>

                <p class="mx-auto max-w-2xl leading-7 text-gray-600">
                    Here are some of the projects I have built using HTML, Tailwind CSS,
                    JavaScript, Vue, and modern frontend tools.
                </p>
            </div>

            <!-- Filter Buttons -->
            <div class="mb-10 flex flex-wrap justify-center gap-3">
                <button v-for="category in categories" :key="category" @click="selectedCategory = category"
                    class="rounded-full border px-5 py-2 font-medium transition" :class="selectedCategory === category
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
                        ">
                    {{ category }}
                </button>
            </div>

            <!-- Projects Grid -->
            <div v-if="filteredProjects.length" class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <ProjectCard v-for="project in filteredProjects" :key="project.id" :project="project" />
            </div>

            <!-- Empty Message -->
            <p v-else class="rounded-xl bg-gray-50 px-5 py-8 text-center text-gray-600">
                No projects found in this category.
            </p>
        </section>
    </main>
</template>