<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
    isMenuOpen.value = false
}




</script>

<template>
    <header class="sticky top-0 z-50 bg-white shadow-sm">
        <nav class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <!-- Logo -->
            <RouterLink to="/" class="text-2xl font-bold text-gray-900" @click="closeMenu">
                Argho
            </RouterLink>

            <!-- Desktop Menu -->
            <div class="hidden items-center gap-8 md:flex">
                <RouterLink to="/" class="font-medium text-gray-700 transition hover:text-blue-600">
                    Home
                </RouterLink>

                <RouterLink to="/projects" class="font-medium text-gray-700 transition hover:text-blue-600">
                    Projects
                </RouterLink>

                <RouterLink to="/about" class="font-medium text-gray-700 transition hover:text-blue-600">
                    About
                </RouterLink>

                <RouterLink to="/contact" class="font-medium text-gray-700 transition hover:text-blue-600">
                    Contact
                </RouterLink>
            </div>

            <!-- Social Icons Desktop -->
            <div class="hidden items-center gap-4 text-xl md:flex">
                <a href="https://github.com/ArghoPH" target="_blank" class="icon-link">
                    <i class="fa-brands fa-github"></i>
                </a>

                <a href="https://linkedin.com/in/argho-chakma-0442561ba/" target="_blank" class="icon-link">
                    <i class="fa-brands fa-linkedin"></i>
                </a>
            </div>

            <!-- Mobile Button -->
            <button class="text-2xl md:hidden" @click="toggleMenu">
                <i :class="isMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
            </button>
        </nav>

        <!-- Mobile Menu -->
        <div v-if="isMenuOpen" class="border-t bg-white md:hidden">
            <div class="flex flex-col gap-4 px-5 py-5">
                <RouterLink to="/" class="mobile-link" @click="closeMenu">Home</RouterLink>
                <RouterLink to="/projects" class="mobile-link" @click="closeMenu">Projects</RouterLink>
                <RouterLink to="/about" class="mobile-link" @click="closeMenu">About</RouterLink>
                <RouterLink to="/contact" class="mobile-link" @click="closeMenu">Contact</RouterLink>

                <div class="flex gap-5 pt-2 text-2xl">
                    <a href="https://github.com/yourusername" target="_blank" class="icon-link">
                        <i class="fa-brands fa-github"></i>
                    </a>

                    <a href="https://linkedin.com/in/yourusername" target="_blank" class="icon-link">
                        <i class="fa-brands fa-linkedin"></i>
                    </a>
                </div>
            </div>
        </div>
    </header>
</template>