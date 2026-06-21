<script setup>
import profileImage from '../images/profile-1.png'
</script>
<template>
    <section
        class="relative min-h-[calc(100vh-80px)]  flex items-center py-8 md:py-16 lg:py-20 overflow-hidden dark:bg-gray-950 transition-colors duration-300">

        <div
            class="absolute -top-40 -right-40 -z-10 h-[400px] w-[400px] md:h-[600px] md:w-[600px] rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/0 blur-3xl dark:from-blue-600/10 dark:to-transparent">
        </div>
        <div
            class="absolute -bottom-40 -left-40 -z-10 h-[400px] w-[400px] md:h-[600px] md:w-[600px] rounded-full bg-gradient-to-tr from-indigo-400/10 to-pink-400/0 blur-3xl dark:from-indigo-600/10 dark:to-transparent">
        </div>

        <div class="mx-auto max-w-8xl w-4/5 px-6 lg:px-8 z-10">
            <div class="flex flex-col-reverse items-center gap-5 md:flex-row md:justify-between">

                <!-- Text Content -->
                <div class="w-full md:w-3/5 text-center md:text-left">

                    <div
                        class="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-700 backdrop-blur-sm dark:border-blue-900/30 dark:bg-blue-950/40">
                        <span class="relative flex h-2 w-2">
                            <span
                                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                            <span class="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                        </span>
                        Available for Remote
                    </div>

                    <div class="space-y-4">
                        <p class="text-base font-medium tracking-wide text-gray-500 dark:text-gray-400 sm:text-lg">
                            Hi, my name is
                        </p>

                        <h1 class="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                            <span
                                class="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                                Argho Chakma
                            </span>
                        </h1>

                        <h2
                            class="text-xl font-bold tracking-tight text-gray-700 dark:text-gray-300 sm:text-2xl lg:text-3xl">
                            Frontend Engineer & UI/UX Enthusiast
                        </h2>
                    </div>

                    <p class="mt-6 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-400 lg:text-lg">
                        I bridge the gap design and code, crafting interactive visual
                        systems that are resilient, performant, and delightful to experience.
                        Specialized in
                        <span class="font-semibold text-gray-900 dark:text-white">
                            Vue.js, Tailwind CSS
                        </span>,
                        and scalable architecture.
                    </p>

                    <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">

                        <RouterLink to="/projects"
                            class="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-700/30 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:shadow-none">
                            <span>Explore My Work</span>
                            <i
                                class="fa-solid fa-arrow-right text-sm transition-transform duration-300 group-hover:translate-x-1"></i>
                        </RouterLink>

                        <RouterLink to="/contact"
                            class="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
                            Get In Touch
                        </RouterLink>
                    </div>

                    <div class="mt-6 flex justify-center gap-6 text-xl md:justify-start">

                        <a href="https://github.com/ArghoPH" target="_blank" rel="noopener noreferrer"
                            class="text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:text-gray-900 dark:hover:text-white">
                            <i class="fa-brands fa-github"></i>
                        </a>

                        <a href="https://linkedin.com/in/argho-chakma-0442561ba/" target="_blank"
                            rel="noopener noreferrer"
                            class="text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:text-blue-600 dark:hover:text-blue-400">
                            <i class="fa-brands fa-linkedin"></i>
                        </a>

                        <a href="mailto:arghochakma7@gmail.com"
                            class="text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:text-red-500 dark:hover:text-red-400">
                            <i class="fa-solid fa-envelope"></i>
                        </a>

                    </div>
                </div>

                <!-- Image -->
                <div class="w-full md:w-2/5 flex justify-center">

                    <div class="relative group w-full max-w-[520px] aspect-square">

                        <div
                            class="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-600 to-purple-600 opacity-20 blur-xl transition-all duration-500 group-hover:scale-105 group-hover:opacity-30">
                        </div>

                        <div
                            class="relative h-full w-full overflow-hidden rounded-3xl border border-gray-200/50 bg-white p-3 shadow-2xl transition-all duration-500 group-hover:-translate-y-2 dark:border-gray-800/50 dark:bg-gray-900">

                            <div class="h-full w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-gray-800">

                                <img :src="profileImage" alt="Profile"
                                    class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>

    </section>
</template>