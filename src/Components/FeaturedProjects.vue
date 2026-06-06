<script setup>
import { projects } from '@/data/projects'
import ProjectCard from '@/Components/ProjectCard.vue'

const featuredProjects = projects.slice(0, 3)
</script>

<template>
    <section class="">
        <div class="container mx-auto px-4 sm:px-6 py-16">
            <div class="mb-12 text-center">
                <p class="mb-3 font-semibold text-blue-600 dark:text-blue-400">Featured Work</p>

                <h2 class="mb-4 text-3xl font-bold dark:text-white sm:text-4xl">
                    Recent Projects
                </h2>

                <p class="mx-auto max-w-2xl leading-7 dark:text-slate-300">
                    Here are some of my recent projects built with HTML, Tailwind CSS,
                    JavaScript, Vue, and modern frontend tools.
                </p>
            </div>

            <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <ProjectCard v-for="project in featuredProjects" :key="project.id" :project="project" />
            </div>

            <div class="mt-10 text-center">
                <RouterLink to="/projects"
                    class="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                    View All Projects
                    <i class="fa-solid fa-arrow-right ml-2"></i>
                </RouterLink>
            </div>
        </div>
    </section>
</template>