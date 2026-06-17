<template>
    <main class="bg-white dark:bg-gray-950">
        <section class="container mx-auto px-4 sm:px-6 py-16 ">
            <!-- Heading -->
            <div class="mb-12 text-center">
                <p class="mb-3 font-semibold text-blue-600">About Me</p>

                <h1 class="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
                    Who I Am
                </h1>

                <p class="mx-auto max-w-2xl leading-7 text-gray-600 dark:text-slate-300">
                    I am a frontend developer who loves building responsive, modern,
                    and user-friendly websites using HTML, Tailwind CSS, JavaScript,
                    and Vue.
                </p>
            </div>

            <!-- About Content -->
            <div class="grid items-center gap-10 md:grid-cols-2">
                <!-- Left Image / Placeholder -->
                <div>
                    <div
                        class="mx-auto flex h-72 w-72 items-center justify-center rounded-2xl bg-blue-50 text-6xl font-bold text-blue-600 shadow-md sm:h-80 sm:w-80 ">
                        <div class="h-full w-full overflow-hidden rounded-2xl bg-slate-100 dark:bg-gray-800">

                            <img :src="profileImage" alt="Profile"
                                class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />

                        </div>
                    </div>
                </div>

                <!-- Right Text -->
                <div>
                    <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                        Frontend Developer
                    </h2>

                    <p class="mb-4 leading-7 text-gray-600 dark:text-slate-300">
                        I have built multiple projects using HTML, Tailwind CSS,
                        JavaScript, FontAwesome, and modern frontend tools. Now I am
                        converting my portfolio into Vue to make it more structured,
                        reusable, and easier to maintain.
                    </p>

                    <p class="mb-6 leading-7 text-gray-600 dark:text-slate-300">
                        I enjoy creating clean UI, responsive layouts, and interactive
                        user experiences.
                    </p>

                    <RouterLink to="/projects"
                        class="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-500">
                        View My Projects
                        <i class="fa-solid fa-arrow-right ml-2"></i>
                    </RouterLink>
                </div>
            </div>

            <!-- Skills -->
            <section class="mt-20">
                <div class="mb-10 text-center">
                    <p class="mb-3 font-semibold text-blue-600">My Skills</p>

                    <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                        Technologies I Use
                    </h2>
                </div>

                <div class="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div v-for="skill in skills" :key="skill.name"
                        class="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:bg-gray-800 dark:border-gray-600">
                        <i :class="skill.icon" class="mb-4 text-4xl text-blue-600"></i>

                        <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                            {{ skill.name }}
                        </h3>
                    </div>
                </div>
            </section>
        </section>
    </main>
</template>

<script setup>
import profileImage from '../images/profile-1.png'
const skills = [
    {
        name: 'HTML',
        icon: 'fa-brands fa-html5',
    },
    {
        name: 'CSS',
        icon: 'fa-brands fa-css3-alt',
    },

    {
        name: 'Sass',
        icon: 'fa-brands fa-sass',
    },

    {
        name: 'Bootstrap',
        icon: 'fa-brands fa-bootstrap',
    },

    {
        name: 'Tailwind CSS',
        icon: 'fa-solid fa-wind',
    },

    {
        name: 'ASP.NET Core',
        icon: 'fa-brands fa-dot-net',
    },

    {
        name: 'JavaScript',
        icon: 'fa-brands fa-js',
    },
    {
        name: 'Vue',
        icon: 'fa-brands fa-vuejs',
    },
    {
        name: 'Tailwind CSS',
        icon: 'fa-solid fa-wind',
    },
    {
        name: 'GitHub',
        icon: 'fa-brands fa-github',
    },
    {
        name: 'FontAwesome',
        icon: 'fa-solid fa-icons',
    },
    {
        name: 'Responsive Design',
        icon: 'fa-solid fa-mobile-screen-button',
    },
]
</script>