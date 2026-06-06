<script setup>
import profileImage from '../images/profile-1.png'
</script>
<template>
    <section
        class="relative min-h-[calc(100vh-80px)] overflow-hidden flex items-center transition-colors duration-300 pb-12 md:pb-20">

        <!-- Ambient Background Glows (UI/UX Depth Effect) -->
        <div
            class="absolute -top-40 -right-40 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/0 blur-3xl dark:from-blue-600/10 dark:to-transparent">
        </div>
        <div
            class="absolute -bottom-40 -left-40 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-indigo-400/10 to-pink-400/0 blur-3xl dark:from-indigo-600/10 dark:to-transparent">
        </div>

        <div class="mx-auto max-w-8xl w-full p-25 md:py-20 z-10">
            <div class="flex flex-col-reverse items-center gap-12 lg:gap-16 md:flex-row md:justify-between">

                <!-- Left Content Area -->
                <div class="w-full text-center md:w-1/2 md:text-left space-y-6">

                    <!-- Premium Interactive Status Badge -->
                    <div
                        class="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/50 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-700 backdrop-blur-sm dark:border-blue-900/30 dark:bg-blue-950/40">
                        <span class="flex h-2 w-2 relative">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Available for Full-time Roles
                    </div>

                    <!-- Main Typography with Text Gradient -->
                    <div class="space-y-3">
                        <p class="text-lg font-medium tracking-wide text-gray-500 dark:text-gray-400 text-center">
                            Hi, my name is
                        </p>
                        <h1
                            class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
                            <span
                                class="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                                Argho Chakma
                            </span>
                        </h1>
                        <h2 class="text-2xl font-bold tracking-tight text-gray-700 sm:text-3xl dark:text-gray-300">
                            Frontend Engineer & UI/UX Enthusiast
                        </h2>
                    </div>

                    <!-- Description with enhanced readability -->
                    <p class="max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
                        I bridge the gap between design and code, crafting interactive visual systems that are
                        resilient, performant, and delightful to experience. Specialized in
                        <span class="font-semibold text-gray-900 dark:text-white">Vue.js, Tailwind CSS</span>, and
                        scalable architecture.
                    </p>

                    <!-- Call To Actions (High-Impact Buttons) -->
                    <div class="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start pt-2">
                        <RouterLink to="/projects"
                            class="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-700/30 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:shadow-none">
                            <span>Explore My Work</span>
                            <i
                                class="fa-solid fa-arrow-right text-sm transition-transform duration-300 group-hover:translate-x-1"></i>
                        </RouterLink>

                        <RouterLink to="/contact"
                            class="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3.5 font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
                            Get In Touch
                        </RouterLink>
                    </div>

                    <!-- Social Branding Icons -->
                    <div class="flex justify-center gap-6 text-xl pt-4 md:justify-start">
                        <a href="https://github.com/ArghoPH" target="_blank" rel="noopener noreferrer"
                            aria-label="GitHub Profile"
                            class="text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:text-gray-900 dark:hover:text-white">
                            <i class="fa-brands fa-github"></i>
                        </a>
                        <a href="https://linkedin.com/in/argho-chakma-0442561ba/" target="_blank"
                            rel="noopener noreferrer" aria-label="LinkedIn Profile"
                            class="text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:text-blue-600 dark:hover:text-blue-400">
                            <i class="fa-brands fa-linkedin"></i>
                        </a>
                        <a href="mailto:arghochakma7@gmail.com" aria-label="Send Email"
                            class="text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:text-red-500 dark:hover:text-red-400">
                            <i class="fa-solid fa-envelope"></i>
                        </a>
                    </div>
                </div>

                <!-- Right Visual Area (Squircle Frame with Ambient Drop Shadow) -->
                <div class="w-full md:w-1/2 flex justify-center">
                    <div class="relative group max-w-[320px] sm:max-w-[380px] w-full aspect-square">

                        <!-- Glow behind the picture frame -->
                        <div
                            class="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-600 to-purple-600 opacity-20 blur-xl transition-all duration-500 group-hover:scale-105 group-hover:opacity-30">
                        </div>

                        <!-- Main Frame Container -->
                        <div
                            class="relative h-full w-full overflow-hidden rounded-3xl border border-gray-200/50 bg-white p-3 shadow-2xl transition-all duration-500 group-hover:-translate-y-2 dark:border-gray-800/50 dark:bg-gray-900">
                            <div class="h-full w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-gray-800">
                                <img :src="profileImage" alt="Profile"
                                    class="h-full w-full object-cover scale-100 transition-transform duration-700 ease-out group-hover:scale-105" />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    </section>
</template>