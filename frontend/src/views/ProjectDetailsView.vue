<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import DOMPurify from 'dompurify'

import { projectService } from '@/services/projectService'

const route = useRoute()

const project = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')
const activeImageIndex = ref(0)

const isModalOpen = ref(false)
const modalImageIndex = ref(0)
const zoom = ref(1)
const imagePosition = reactive({
  x: 0,
  y: 0
})
const isDragging = ref(false)
const dragStart = reactive({
  x: 0,
  y: 0
})

const galleryImages = computed(() => {
  if (!project.value) {
    return []
  }

  const images = []

  if (project.value.imageUrl) {
    images.push({
      url: project.value.imageUrl,
      label: 'Cover Image'
    })
  }

  if (Array.isArray(project.value.galleryImageUrls)) {
    project.value.galleryImageUrls.forEach((url, index) => {
      images.push({
        url,
        label: `Project Image ${index + 1}`
      })
    })
  }

  return images
})

const activeImage = computed(() => {
  return galleryImages.value[activeImageIndex.value] || null
})

const activeModalImage = computed(() => {
  return galleryImages.value[modalImageIndex.value] || null
})

const modalImageStyle = computed(() => {
  return {
    transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${zoom.value})`
  }
})

const safeDescriptionHtml = computed(() => {
  const description = project.value?.description || ''

  const hasHtml = /<\/?[a-z][\s\S]*>/i.test(description)

  const html = hasHtml
    ? description
    : description.replace(/\n/g, '<br>')

  return DOMPurify.sanitize(html)
})

function resetZoom() {
  zoom.value = 1
  imagePosition.x = 0
  imagePosition.y = 0
}

function clampZoom(value) {
  return Math.min(Math.max(value, 1), 5)
}

function zoomIn() {
  zoom.value = clampZoom(Number((zoom.value + 0.25).toFixed(2)))
}

function zoomOut() {
  zoom.value = clampZoom(Number((zoom.value - 0.25).toFixed(2)))

  if (zoom.value === 1) {
    imagePosition.x = 0
    imagePosition.y = 0
  }
}

function handleWheelZoom(event) {
  event.preventDefault()

  const direction = event.deltaY < 0 ? 0.2 : -0.2
  zoom.value = clampZoom(Number((zoom.value + direction).toFixed(2)))

  if (zoom.value === 1) {
    imagePosition.x = 0
    imagePosition.y = 0
  }
}

function startDragging(event) {
  if (event.button !== 0 || zoom.value <= 1) {
    return
  }

  event.preventDefault()

  isDragging.value = true
  dragStart.x = event.clientX - imagePosition.x
  dragStart.y = event.clientY - imagePosition.y
}

function dragImage(event) {
  if (!isDragging.value || zoom.value <= 1) {
    return
  }

  imagePosition.x = event.clientX - dragStart.x
  imagePosition.y = event.clientY - dragStart.y
}

function stopDragging() {
  isDragging.value = false
}

function openImageModal(index) {
  modalImageIndex.value = index
  isModalOpen.value = true
  resetZoom()
  document.body.style.overflow = 'hidden'
}

function closeImageModal() {
  isModalOpen.value = false
  resetZoom()
  document.body.style.overflow = ''
}

function goToPreviousImage() {
  if (!galleryImages.value.length) {
    return
  }

  activeImageIndex.value =
    activeImageIndex.value === 0
      ? galleryImages.value.length - 1
      : activeImageIndex.value - 1
}

function goToNextImage() {
  if (!galleryImages.value.length) {
    return
  }

  activeImageIndex.value =
    activeImageIndex.value === galleryImages.value.length - 1
      ? 0
      : activeImageIndex.value + 1
}

function goToPreviousModalImage() {
  if (!galleryImages.value.length) {
    return
  }

  modalImageIndex.value =
    modalImageIndex.value === 0
      ? galleryImages.value.length - 1
      : modalImageIndex.value - 1

  resetZoom()
}

function goToNextModalImage() {
  if (!galleryImages.value.length) {
    return
  }

  modalImageIndex.value =
    modalImageIndex.value === galleryImages.value.length - 1
      ? 0
      : modalImageIndex.value + 1

  resetZoom()
}

function handleKeydown(event) {
  if (!isModalOpen.value) {
    return
  }

  if (event.key === 'Escape') {
    closeImageModal()
  }

  if (event.key === 'ArrowLeft') {
    goToPreviousModalImage()
  }

  if (event.key === 'ArrowRight') {
    goToNextModalImage()
  }

  if (event.key === '+') {
    zoomIn()
  }

  if (event.key === '-') {
    zoomOut()
  }
}

async function loadProject() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    project.value = await projectService.getProjectBySlug(route.params.slug)
  } catch (error) {
    errorMessage.value = error.message || 'Could not load project.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadProject()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <main class="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
    <section class="container mx-auto max-w-6xl">
      <p v-if="isLoading"
        class="rounded-xl bg-white px-5 py-8 text-center text-gray-600 shadow-sm dark:bg-slate-900 dark:text-slate-300">
        Loading project...
      </p>

      <p v-else-if="errorMessage"
        class="rounded-xl bg-red-50 px-5 py-8 text-center text-red-600 dark:bg-red-950 dark:text-red-300">
        {{ errorMessage }}
      </p>

      <article v-else-if="project" class="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-slate-900">
        <div class="p-6 md:p-10">
          <RouterLink to="/projects"
            class="mb-6 inline-flex rounded-xl border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200">
            Back to Projects
          </RouterLink>

          <h1 class="mb-4 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            {{ project.title }}
          </h1>

          <div class="mb-8 flex flex-wrap gap-2">
            <span v-for="tech in project.techStack" :key="tech"
              class="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-slate-800 dark:text-blue-300">
              {{ tech }}
            </span>
          </div>

          <div v-if="galleryImages.length" class="mb-10 rounded-3xl border border-gray-200 p-4 dark:border-slate-800">
            <div class="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                  Project Gallery
                </h2>

                <p class="text-sm text-gray-500 dark:text-slate-400">
                  {{ activeImage?.label }}
                  · {{ activeImageIndex + 1 }} / {{ galleryImages.length }}
                </p>
              </div>

              <div v-if="galleryImages.length > 1" class="flex gap-2">
                <button type="button" @click="goToPreviousImage"
                  class="rounded-xl bg-gray-100 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-slate-800 dark:text-white">
                  Previous
                </button>

                <button type="button" @click="goToNextImage"
                  class="rounded-xl bg-gray-100 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-slate-800 dark:text-white">
                  Next
                </button>
              </div>
            </div>

            <button v-if="activeImage" type="button" @click="openImageModal(activeImageIndex)"
              class="group mb-4 block w-full overflow-hidden rounded-2xl bg-black">
              <img :src="activeImage.url" :alt="activeImage.label"
                class="h-[420px] w-full object-contain transition duration-300 group-hover:scale-[1.02]" />

              <span class="block bg-black/70 px-4 py-3 text-center text-sm font-semibold text-white">
                Click image to view full screen
              </span>
            </button>

            <div v-if="galleryImages.length > 1" class="grid gap-3 sm:grid-cols-3 md:grid-cols-5">
              <button v-for="(image, index) in galleryImages" :key="image.url" type="button"
                @click="activeImageIndex = index" class="rounded-xl border p-2 text-left transition"
                :class="index === activeImageIndex ? 'border-blue-600' : 'border-gray-200 dark:border-slate-800'">
                <img :src="image.url" :alt="image.label" class="mb-2 h-24 w-full rounded-lg object-cover" />

                <p class="text-xs font-semibold text-gray-700 dark:text-slate-200">
                  {{ image.label }}
                </p>
              </button>
            </div>
          </div>

          <div class="project-rich-content" v-html="safeDescriptionHtml"></div>

          <div class="mt-10 flex flex-wrap gap-3">
            <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer"
              class="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
              Visit Live Project
            </a>

            <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer"
              class="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200">
              View GitHub
            </a>
          </div>
        </div>
      </article>
    </section>

    <Teleport to="body">
      <div v-if="isModalOpen"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
        @click.self="closeImageModal" @mousemove="dragImage" @mouseup="stopDragging" @mouseleave="stopDragging">
        <button type="button" @click="closeImageModal"
          class="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-3xl font-bold text-white backdrop-blur transition hover:bg-white/25"
          aria-label="Close image modal">
          ×
        </button>

        <div class="absolute left-5 top-5 z-20 rounded-2xl bg-black/40 px-4 py-3 text-white backdrop-blur">
          <p class="text-sm font-semibold">
            {{ activeModalImage?.label }}
          </p>

          <p class="text-xs text-white/80">
            {{ modalImageIndex + 1 }} / {{ galleryImages.length }} · Zoom {{ Math.round(zoom * 100) }}%
          </p>
        </div>

        <div class="relative flex h-[82vh] w-[94vw] items-center justify-center overflow-hidden rounded-3xl bg-black/30"
          @wheel.prevent="handleWheelZoom">
          <img v-if="activeModalImage" :src="activeModalImage.url" :alt="activeModalImage.label" draggable="false"
            class="max-h-full max-w-full select-none object-contain transition-transform duration-75"
            :class="zoom > 1 ? isDragging ? 'cursor-grabbing' : 'cursor-grab' : 'cursor-zoom-in'"
            :style="modalImageStyle" @mousedown="startDragging" @mouseup="stopDragging"
            @dblclick="zoom === 1 ? zoomIn() : resetZoom()" />
        </div>

        <div
          class="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-wrap items-center justify-center gap-3 rounded-2xl bg-black/45 px-4 py-3 text-white backdrop-blur">
          <button type="button" @click="goToPreviousModalImage"
            class="rounded-xl bg-white/15 px-4 py-2 font-semibold transition hover:bg-white/25">
            Previous
          </button>

          <button type="button" @click="zoomOut"
            class="rounded-xl bg-white/15 px-4 py-2 font-semibold transition hover:bg-white/25">
            Zoom -
          </button>

          <button type="button" @click="resetZoom"
            class="rounded-xl bg-white/15 px-4 py-2 font-semibold transition hover:bg-white/25">
            Reset
          </button>

          <button type="button" @click="zoomIn"
            class="rounded-xl bg-white/15 px-4 py-2 font-semibold transition hover:bg-white/25">
            Zoom +
          </button>

          <button type="button" @click="goToNextModalImage"
            class="rounded-xl bg-white/15 px-4 py-2 font-semibold transition hover:bg-white/25">
            Next
          </button>
        </div>
      </div>
    </Teleport>
  </main>
</template>

<style scoped>
.project-rich-content {
  color: #4b5563;
  font-size: 1.05rem;
  line-height: 1.8;
}

.project-rich-content :deep(h1) {
  font-size: 2.5rem;
  font-weight: 800;
  color: #111827;
  line-height: 1.15;
  margin: 1.5rem 0 1rem;
}

.project-rich-content :deep(h2) {
  font-size: 2rem;
  font-weight: 800;
  color: #111827;
  margin: 1.4rem 0 0.9rem;
}

.project-rich-content :deep(h3) {
  font-size: 1.55rem;
  font-weight: 700;
  color: #111827;
  margin: 1.2rem 0 0.8rem;
}

.project-rich-content :deep(p) {
  margin: 0.8rem 0;
}

.project-rich-content :deep(a) {
  color: #2563eb;
  font-weight: 700;
  text-decoration: underline;
}

.project-rich-content :deep(ul) {
  list-style: disc;
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.project-rich-content :deep(ol) {
  list-style: decimal;
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.project-rich-content :deep(blockquote) {
  border-left: 4px solid #2563eb;
  padding-left: 1rem;
  color: #64748b;
  margin: 1.25rem 0;
}

.project-rich-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  overflow: hidden;
  border-radius: 0.75rem;
}

.project-rich-content :deep(th),
.project-rich-content :deep(td) {
  border: 1px solid #cbd5e1;
  padding: 0.85rem;
  vertical-align: top;
}

.project-rich-content :deep(th) {
  background: #f1f5f9;
  color: #111827;
  font-weight: 800;
}

.project-rich-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 1rem;
  margin: 1.25rem 0;
}

.project-rich-content :deep(hr) {
  margin: 2rem 0;
  border: 0;
  border-top: 1px solid #cbd5e1;
}

.project-rich-content :deep([style*='color: black']),
.project-rich-content :deep([style*='color:#000']),
.project-rich-content :deep([style*='color: #000']),
.project-rich-content :deep([style*='rgb(0, 0, 0)']) {
  color: inherit !important;
}

@media (prefers-color-scheme: dark) {
  .project-rich-content {
    color: #cbd5e1;
  }

  .project-rich-content :deep(h1),
  .project-rich-content :deep(h2),
  .project-rich-content :deep(h3) {
    color: #ffffff;
  }

  .project-rich-content :deep(th) {
    background: #1e293b;
    color: #ffffff;
  }

  .project-rich-content :deep(th),
  .project-rich-content :deep(td) {
    border-color: #334155;
  }
}
</style>

