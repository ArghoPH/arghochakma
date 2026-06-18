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
        <!-- CONTACT -->
        <section id="contact" class="py-28 px-6 relative overflow-hidden">
            <!-- Random Bubbles -->
            <div ref="bubbleContainer" id="bubbles"></div>

            <div class="text-center mb-20 relative z-10">
                <h2
                    class="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                    Let's Work Together
                </h2>
                <p class="text-gray-300 text-lg">Ready to build something powerful and impactful?</p>
            </div>

            <div
                class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 relative z-10 glass-card p-14 rounded-3xl shadow-2xl">
                <!-- Info -->
                <div class="space-y-8 text-gray-300 text-lg">
                    <p>Mail: <a href="mailto:arghochakma2023@gmail.com"
                            class="text-indigo-400 hover:underline">arghochakma2023@gmail.com</a></p>
                    <p><span class="font-semibold text-purple-400">Phone:</span> <a href="tel:01999358618"
                            class="text-indigo-400 hover:underline">01537366505</a></p>
                    <p><span class="font-semibold text-cyan-400">Location:</span> Dhaka, Bangladesh</p>
                </div>

                <!-- Form -->
                <div class="flex flex-col gap-6">
                    <input type="text" placeholder="Your Name" class="rounded-xl px-5 py-3 focus:outline-none">
                    <input type="email" placeholder="Your Email" class="rounded-xl px-5 py-3 focus:outline-none">
                    <input type="text" placeholder="Subject" class="rounded-xl px-5 py-3 focus:outline-none">
                    <textarea rows="4" placeholder="Your Message"
                        class="rounded-xl px-5 py-3 focus:outline-none"></textarea>
                    <button class="btn-neon text-white font-semibold px-6 py-4 rounded-xl">
                        Send Message for more information and updates
                    </button>
                </div>
            </div>
        </section>
    </main>
</template>
