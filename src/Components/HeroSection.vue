<template>
    <section class="min-h-[calc(100vh-80px)] bg-white">
        <div
            class="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-5 py-16 md:flex-row md:justify-between">

            <!-- Left Content -->
            <div class="w-full text-center md:w-1/2 md:text-left">
                <p class="mb-3 text-lg font-semibold text-blue-600">
                    Hi, I am
                </p>

                <h1 class="mb-4 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
                    A
                </h1>

                <h2 class="mb-6 text-2xl font-semibold text-gray-700 sm:text-3xl">
                    Frontend Developer
                </h2>

                <p class="mb-8 text-base leading-7 text-gray-600 sm:text-lg">
                    I build responsive, modern, and user-friendly web applications using
                    Vue, JavaScript, Tailwind CSS, and frontend technologies.
                </p>

                <!-- Buttons -->
                <div class="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
                    <RouterLink to="/projects"
                        class="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                        View Projects
                        <i class="fa-solid fa-arrow-right ml-2"></i>
                    </RouterLink>

                    <RouterLink to="/contact"
                        class="rounded-lg border border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50">
                        Contact Me
                    </RouterLink>
                </div>

                <!-- Social Icons -->
                <div class="mt-8 flex justify-center gap-5 text-2xl md:justify-start">
                    <a href="https://github.com/yourusername" target="_blank"
                        class="text-gray-700 transition hover:text-blue-600">
                        <i class="fa-brands fa-github"></i>
                    </a>

                    <a href="https://linkedin.com/in/yourusername" target="_blank"
                        class="text-gray-700 transition hover:text-blue-600">
                        <i class="fa-brands fa-linkedin"></i>
                    </a>

                    <a href="mailto:your.email@example.com" class="text-gray-700 transition hover:text-blue-600">
                        <i class="fa-solid fa-envelope"></i>
                    </a>
                </div>
            </div>

            <!-- Right Image -->
            <div class="w-full md:w-1/2">
                <div
                    class="mx-auto h-72 w-72 overflow-hidden rounded-full border-4 border-blue-600 shadow-lg sm:h-80 sm:w-80">
                    <img src="/images/profile.jpg" alt="Pravakar" class="h-full w-full object-cover" />
                </div>
            </div>

        </div>
    </section>
</template>