<script setup>
import { ref, onMounted } from 'vue'

const isMenuOpen = ref(false)
const isDark = ref(false)

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
    isMenuOpen.value = false
}

onMounted(() => {
    isDark.value = localStorage.getItem('theme') === 'dark'

    if (isDark.value) {
        document.documentElement.classList.add('dark')
    }
})

function toggleTheme() {
    isDark.value = !isDark.value

    if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
    }
}
</script>

<template>
    <header class="sticky top-0 z-50 shadow-sm">
        <nav
            class="mx-auto flex items-center justify-between px-5 py-4 bg-white dark:bg-gray-950 transition-colors duration-300">

            <!-- Logo -->
            <RouterLink to="/" class="text-2xl font-bold text-black dark:text-white" @click="closeMenu">
                Argho
            </RouterLink>

            <!-- Desktop Menu -->
            <div class="hidden items-center gap-6 md:flex">

                <!-- Theme Toggle -->
                <button @click="toggleTheme" class="text-xl text-gray-700 dark:text-gray-200">
                    <i :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
                </button>

                <RouterLink to="/"
                    class="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">
                    Home
                </RouterLink>

                <RouterLink to="/projects"
                    class="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">
                    Projects
                </RouterLink>

                <RouterLink to="/about"
                    class="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">
                    About
                </RouterLink>

                <RouterLink to="/contact"
                    class="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">
                    Contact
                </RouterLink>

            </div>

            <!-- Social Icons Desktop -->
            <div class="hidden items-center gap-4 text-xl md:flex">
                <a href="https://github.com/ArghoPH" target="_blank"
                    class="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">
                    <i class="fa-brands fa-github"></i>
                </a>

                <a href="https://linkedin.com/in/argho-chakma-0442561ba/" target="_blank"
                    class="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">
                    <i class="fa-brands fa-linkedin"></i>
                </a>
            </div>

            <!-- Mobile Menu Button -->
            <button class="text-2xl text-black dark:text-white md:hidden" @click="toggleMenu">
                <i :class="isMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
            </button>
        </nav>

        <!-- Mobile Menu -->
        <div v-if="isMenuOpen"
            class="md:hidden border-t bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">

            <div class="flex flex-col gap-4 px-5 py-5">

                <!-- Theme Toggle -->
                <button @click="toggleTheme" class="w-fit text-xl text-gray-700 dark:text-gray-200">
                    <i :class="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'"></i>
                </button>

                <RouterLink to="/"
                    class="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition"
                    @click="closeMenu">
                    Home
                </RouterLink>

                <RouterLink to="/projects"
                    class="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition"
                    @click="closeMenu">
                    Projects
                </RouterLink>

                <RouterLink to="/about"
                    class="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition"
                    @click="closeMenu">
                    About
                </RouterLink>

                <RouterLink to="/contact"
                    class="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition"
                    @click="closeMenu">
                    Contact
                </RouterLink>

                <div class="flex gap-5 pt-2 text-2xl">
                    <a href="https://github.com/ArghoPH" target="_blank"
                        class="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">
                        <i class="fa-brands fa-github"></i>
                    </a>

                    <a href="https://linkedin.com/in/argho-chakma-0442561ba/" target="_blank"
                        class="text-gray-700 dark:text-gray-200 hover:text-blue-600 transition">
                        <i class="fa-brands fa-linkedin"></i>
                    </a>
                </div>

            </div>
        </div>
    </header>
</template>