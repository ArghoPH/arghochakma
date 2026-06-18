<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import bodyScript from '@/assets/body.js'

const skillsContainer = ref(null)
const bubbleContainer = ref(null)

let cleanup = null

onMounted(() => {
    cleanup = bodyScript({
        skillsContainer: skillsContainer.value,
        bubbleContainer: bubbleContainer.value
    })
})

onBeforeUnmount(() => {
    if (cleanup) cleanup()
})
</script>
<template class="">
    <!-- ABOUT -->
    <section id="about" class="py-20 px-6 relative overflow-hidden dark:bg-gray-900">
        <div class="container mx-auto px-4 sm:px-6 py-16  transition-colors duration-300">
            <div class="text-center mb-12">
                <span
                    class="bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-900 animate-text-flow font-extrabold text-4xl md:text-5xl tracking-tight">
                    About Me
                </span>
                <p class="bg-gradient-to-r from-sky-900 via-blue-400 to-purple-700 animate-text-flow font-bold mt-3">
                    Passionate about creating digital experiences that make a difference
                </p>
            </div>

            <div class="flex flex-col md:flex-row gap-12">
                <!-- Left Section - Modern Styled -->
                <div
                    class="flex-1 space-y-6 p-6 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white rounded-2xl shadow-2xl">

                    <!-- Intro -->
                    <p class="text-lg md:text-xl font-medium tracking-wide">
                        With over <span class="font-bold text-yellow-400">4 year</span> of experience in
                        <span class="font-bold decoration-yellow-300 text-yellow-400">Frontend Development</span>
                        and
                        <span class="font-bold text-yellow-300">UI/UX design</span>.
                    </p>

                    <!-- Stats -->
                    <div class="flex gap-6 mt-4">
                        <!-- Projects -->
                        <div
                            class="flex-1 bg-black bg-opacity-20 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-opacity-40 transition">
                            <h3 class="text-3xl md:text-4xl font-extrabold text-yellow-300">12+</h3>
                            <p class="text-white text-sm md:text-base mt-1">Projects Completed</p>
                        </div>

                        <!-- Experience -->
                        <div
                            class="flex-1 bg-black bg-opacity-20 rounded-xl p-4 flex flex-col items-center justify-center hover:bg-opacity-40 transition">
                            <h3 class="text-3xl md:text-4xl font-extrabold text-yellow-300">4+</h3>
                            <p class="text-white text-sm md:text-base mt-1">Years Experience</p>
                        </div>
                    </div>

                    <!-- Right Arrow -->
                    <div class="mt-4 animate-slide-x flex justify-start items-center gap-2">
                        <div
                            class="bg-yellow-300 text-gray-900 px-4 py-2 rounded-full cursor-pointer select-none font-bold">
                            <p class="text-gray-700">The Skills ❖</p>
                        </div>
                    </div>
                </div>

                <!-- Right -->
                <div ref="skillsContainer" id="skills-container"
                    class="relative w-full max-w-[700px] h-[220px] md:h-[300px] overflow-hidden rounded-xl">

                    <!-- Frontend / Web Basics -->
                    <div
                        class="skill absolute bg-gradient-to-r from-indigo-700 to-indigo-900 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        Frontend
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-yellow-700 to-yellow-800 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        JavaScript (ES6+)
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-red-500 to-yellow-900 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        ASP.Net
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-red-700 to-blue-800 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        Vue3.js
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-orange-600 to-orange-800 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        HTML5
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-cyan-700 to-cyan-800 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        CSS3
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-pink-700 to-pink-700 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        Tailwind CSS
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        Website Design
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-yellow-600 to-red-500 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        CodeIgnator
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-purple-500 to-purple-900 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        BootStrap
                    </div>

                    <!-- Backend / Server -->
                    <div
                        class="skill absolute bg-gradient-to-r from-yellow-400 to-yellow-700 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        PHP
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-blue-700 to-blue-900 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        MySQL
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-emerald-700 to-emerald-800 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        REST API
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-teal-500 to-teal-900 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        REST API Integration
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-orange-600 to-purple-800 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        Web Development
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-rose-600 to-rose-800 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        API Integration
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-slate-900 to-rose-800 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        Docker
                    </div>

                    <!-- Design / UI/UX -->
                    <div
                        class="skill absolute bg-gradient-to-r from-rose-700 to-rose-900 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        UI/UX
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-fuchsia-700 to-fuchsia-900 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        Figma
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        UI/UX Design
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-fuchsia-600 to-indigo-800 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        User Flow & Wireframe
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-rose-500 to-fuchsia-800 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        Git
                    </div>
                    <div
                        class="skill absolute bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full cursor-pointer select-none">
                        Responsive Design
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- SERVICES -->
    <section id="services" class="py-32 px-6 relative overflow-hidden animated-bg-shift dark:bg-gray-950">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
            <div class="absolute top-10 left-10 w-96 h-96 bg-purple-900 rounded-full blur-[120px] animate-pulse"></div>
            <div class="absolute bottom-10 right-10 w-96 h-96 bg-orange-900 rounded-full blur-[120px] animate-pulse">
            </div>
        </div>

        <div class="max-w-7xl mx-auto relative z-10">
            <div class="text-center mb-20">
                <h2 class="text-5xl font-extrabold mb-6 tracking-tight text-gray-900" data-aos="fade-up">
                    <span class="bg-gradient-to-r from-orange-600 via-purple-600 to-indigo-600 animate-text-flow">
                        My Expertise
                    </span>
                </h2>
                <p class="text-white text-lg max-w-2xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="100">
                    I bridge the gap between complex problems and intuitive digital solutions. Specialized in
                    high-performance web experiences.
                </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8" data-aos="fade-up" data-aos-delay="300">
                <div
                    class="group relative bg-white/60 dark:bg-slate-800/80 backdrop-blur-md p-8 rounded-3xl border border-white/40 dark:border-gray-700 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out">
                    <div
                        class="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </div>
                    <h3
                        class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                        Frontend Architecture
                    </h3>
                    <p class="text-justify text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        Crafting responsive and modern frontend interfaces using Vue.js, Tailwind CSS, Bootstrap,
                        JavaScript, HTML, and CSS with clean layouts and user-friendly design.
                    </p>
                </div>

                <div
                    class="group relative bg-white/60 dark:bg-slate-800/80 backdrop-blur-md p-8 rounded-3xl border border-white/40 dark:border-gray-700 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    <div
                        class="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                    </div>
                    <h3
                        class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 transition-colors">
                        Product Design
                    </h3>
                    <p class="text-justify text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        Creating user-centric product designs and wireframes that enhance accessibility, usability, and
                        user engagement across web and mobile applications.
                    </p>
                </div>

                <div
                    class="group relative bg-white/60 dark:bg-slate-800/80 backdrop-blur-md p-8 rounded-3xl border border-white/40 dark:border-gray-700 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    <div
                        class=" mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-50
                    text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3
                        class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-rose-600 transition-colors">
                        Mobile Experience
                    </h3>
                    <p class="text-justify text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        Designing modern and user-friendly mobile application UI/UX in Figma with responsive layouts,
                        reusable components, and complete application flow planning.
                    </p>
                </div>

                <div
                    class="group relative bg-white/60 dark:bg-slate-800/80 backdrop-blur-md p-8 rounded-3xl border border-white/40 dark:border-gray-700 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    <div
                        class="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                        </svg>
                    </div>
                    <h3
                        class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 transition-colors">
                        Full-stack Dev
                    </h3>
                    <p class="text-justify text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        Experienced in frontend and full-stack web development with expertise in Vue.js, HTML, Tailwind
                        CSS, JavaScript, PHP, Figma UI design, and database management using cPanel and phpMyAdmin.
                    </p>
                </div>
            </div>
        </div>
    </section>


</template>

<style>
@keyframes slide-x {

    0%,
    20% {
        transform: translateX(0);
    }

    80% {
        transform: translateX(120px);
    }

    100% {
        transform: translateX(0);
    }
}

.animate-slide-x {
    animation: slide-x 4s ease-in-out infinite;
}

.skill {
    user-select: none;
    width: max-content;
    transition: transform 0.2s;
}

@keyframes bgGradientShift {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.animated-bg-shift {
    background: linear-gradient(-45deg, #064547, #673491, #150d3f, #4d2068);
    background-size: 400% 400%;
    animation: bgGradientShift 15s ease infinite;
}

.animate-text-flow {
    background-size: 200% auto;
    animation: bgGradientShift 4s ease infinite;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

#contact {
    background: radial-gradient(circle at top left, #0f172a, #0b1120 60%);
    position: relative;
    color: white;
    overflow: hidden;
}

#bubbles {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
}

.bubble {
    position: absolute;
    border-radius: 50%;
    opacity: 0.15;
    animation: rise linear infinite;
    backdrop-filter: blur(2px);
}

@keyframes rise {
    0% {
        transform: translateY(0) translateX(0) rotate(0deg);
        opacity: 0.1;
    }

    50% {
        opacity: 0.25;
    }

    100% {
        transform: translateY(-120vh) translateX(100px) rotate(360deg);
        opacity: 0;
    }
}

.glass-card {
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(25px);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

input,
textarea {
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
}

input:focus,
textarea:focus {
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.7);
    transform: scale(1.02);
    transition: 0.3s;
}

.btn-neon {
    background: linear-gradient(90deg, #4f46e5, #9333ea);
    box-shadow: 0 0 20px rgba(147, 51, 234, 0.6);
    transition: 0.4s;
}

.btn-neon:hover {
    box-shadow: 0 0 40px rgba(147, 51, 234, 1);
    transform: scale(1.05);
}
</style>