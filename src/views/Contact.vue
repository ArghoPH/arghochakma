<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const successMessage = ref('')

function handleSubmit() {
    successMessage.value = 'Thank you! Your message has been received.'

    name.value = ''
    email.value = ''
    message.value = ''

    setTimeout(() => {
        successMessage.value = ''
    }, 3000)
}
</script>

<template>
    <main class="bg-white">
        <section class="mx-auto max-w-6xl px-5 py-16">
            <!-- Heading -->
            <div class="mb-12 text-center">
                <p class="mb-3 font-semibold text-blue-600">Contact Me</p>

                <h1 class="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
                    Get In Touch
                </h1>

                <p class="mx-auto max-w-2xl leading-7 text-gray-600">
                    Have a project idea, collaboration, or work opportunity? Feel free to
                    contact me.
                </p>
            </div>

            <div class="grid gap-10 md:grid-cols-2">
                <!-- Contact Info -->
                <div class="space-y-6">
                    <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div class="mb-3 text-3xl text-blue-600">
                            <i class="fa-solid fa-envelope"></i>
                        </div>

                        <h3 class="mb-2 text-xl font-bold text-gray-900">Email</h3>

                        <a href="mailto:your.email@example.com" class="text-gray-600 transition hover:text-blue-600">
                            your.email@example.com
                        </a>
                    </div>

                    <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div class="mb-3 text-3xl text-blue-600">
                            <i class="fa-brands fa-github"></i>
                        </div>

                        <h3 class="mb-2 text-xl font-bold text-gray-900">GitHub</h3>

                        <a href="https://github.com/yourusername" target="_blank"
                            class="text-gray-600 transition hover:text-blue-600">
                            github.com/yourusername
                        </a>
                    </div>

                    <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div class="mb-3 text-3xl text-blue-600">
                            <i class="fa-brands fa-linkedin"></i>
                        </div>

                        <h3 class="mb-2 text-xl font-bold text-gray-900">LinkedIn</h3>

                        <a href="https://linkedin.com/in/yourusername" target="_blank"
                            class="text-gray-600 transition hover:text-blue-600">
                            linkedin.com/in/yourusername
                        </a>
                    </div>
                </div>

                <!-- Contact Form -->
                <form class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" @submit.prevent="handleSubmit">
                    <div class="mb-5">
                        <label class="mb-2 block font-semibold text-gray-700">
                            Name
                        </label>

                        <input v-model="name" type="text" required placeholder="Your name"
                            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600" />
                    </div>

                    <div class="mb-5">
                        <label class="mb-2 block font-semibold text-gray-700">
                            Email
                        </label>

                        <input v-model="email" type="email" required placeholder="Your email"
                            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600" />
                    </div>

                    <div class="mb-5">
                        <label class="mb-2 block font-semibold text-gray-700">
                            Message
                        </label>

                        <textarea v-model="message" required rows="6" placeholder="Write your message..."
                            class="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600"></textarea>
                    </div>

                    <button type="submit"
                        class="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                        Send Message
                        <i class="fa-solid fa-paper-plane ml-2"></i>
                    </button>

                    <p v-if="successMessage"
                        class="mt-4 rounded-lg bg-green-50 px-4 py-3 text-center font-medium text-green-700">
                        {{ successMessage }}
                    </p>
                </form>
            </div>
        </section>
    </main>
</template>