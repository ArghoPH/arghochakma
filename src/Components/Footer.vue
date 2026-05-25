<template>
    <footer
        class="bg-white border-t border-gray-200 transition-colors duration-300 dark:bg-gray-900 dark:border-gray-800">
        <div class="mx-auto max-w-6xl px-5 py-10 md:py-12">
            <div class="flex flex-col items-center justify-between gap-8 md:flex-row">

                <div class="text-center md:text-left">
                    <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        A<span class="text-blue-600">.</span>
                    </h2>
                    <p class="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Crafting intuitive digital experiences.
                    </p>
                </div>

                <nav aria-label="Social Media Profiles" class="flex items-center gap-6 text-xl">
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer"
                        aria-label="Visit my GitHub profile"
                        class="text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:hover:text-white">
                        <i class="fa-brands fa-github" aria-hidden="true"></i>
                    </a>

                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer"
                        aria-label="Connect with me on LinkedIn"
                        class="text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:hover:text-blue-400">
                        <i class="fa-brands fa-linkedin" aria-hidden="true"></i>
                    </a>

                    <a href="mailto:your.email@example.com" aria-label="Send me an email"
                        class="text-gray-500 transition-all duration-300 hover:-translate-y-1 hover:text-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:hover:text-red-400">
                        <i class="fa-solid fa-envelope" aria-hidden="true"></i>
                    </a>
                </nav>
            </div>

            <hr class="my-8 border-gray-200 dark:border-gray-800" />

            <div
                class="flex flex-col items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400 md:flex-row">
                <p>
                    &copy; {{ currentYear }} A. All rights reserved.
                </p>
                <p class="text-xs">
                    Designed & Built with <i class="fa-solid fa-heart text-red-500 mx-1" aria-hidden="true"></i>
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { computed } from 'vue';

// Dynamically generate the current year so you never have to update it manually
const currentYear = computed(() => new Date().getFullYear());
</script>