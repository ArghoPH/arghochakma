<template>
    <main class="bg-white">
        <section class="mx-auto max-w-6xl px-5 py-16">
            <!-- Heading -->
            <div class="mb-12 text-center">
                <p class="mb-3 font-semibold text-blue-600">About Me</p>

                <h1 class="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
                    Who I Am
                </h1>

                <p class="mx-auto max-w-2xl leading-7 text-gray-600">
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
                        class="mx-auto flex h-72 w-72 items-center justify-center rounded-2xl bg-blue-50 text-6xl font-bold text-blue-600 shadow-md sm:h-80 sm:w-80">
                        P
                    </div>
                </div>

                <!-- Right Text -->
                <div>
                    <h2 class="mb-4 text-3xl font-bold text-gray-900">
                        Frontend Developer
                    </h2>

                    <p class="mb-4 leading-7 text-gray-600">
                        I have built multiple projects using HTML, Tailwind CSS,
                        JavaScript, FontAwesome, and modern frontend tools. Now I am
                        converting my portfolio into Vue to make it more structured,
                        reusable, and easier to maintain.
                    </p>

                    <p class="mb-6 leading-7 text-gray-600">
                        I enjoy creating clean UI, responsive layouts, and interactive
                        user experiences.
                    </p>

                    <RouterLink to="/projects"
                        class="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                        View My Projects
                        <i class="fa-solid fa-arrow-right ml-2"></i>
                    </RouterLink>
                </div>
            </div>

            <!-- Skills -->
            <section class="mt-20">
                <div class="mb-10 text-center">
                    <p class="mb-3 font-semibold text-blue-600">My Skills</p>

                    <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Technologies I Use
                    </h2>
                </div>

                <div class="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div v-for="skill in skills" :key="skill.name"
                        class="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                        <i :class="skill.icon" class="mb-4 text-4xl text-blue-600"></i>

                        <h3 class="text-lg font-bold text-gray-900">
                            {{ skill.name }}
                        </h3>
                    </div>
                </div>
            </section>
        </section>
    </main>
</template>

<script setup>
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