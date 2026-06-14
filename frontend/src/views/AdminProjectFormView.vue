<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { projectService } from '@/services/projectService'
import { uploadService } from '@/services/uploadService'

const route = useRoute()
const router = useRouter()

const isEditMode = computed(() => Boolean(route.params.id))

const form = reactive({
  title: '',
  description: '',
  imageUrl: '',
  galleryImageUrls: [],
  liveUrl: '',
  githubUrl: '',
  techStack: '',
  isFeatured: false
})

const isLoading = ref(false)
const isSaving = ref(false)
const isUploadingCover = ref(false)
const isUploadingGallery = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const activeImageIndex = ref(0)

const previewImages = computed(() => {
  const images = []

  if (form.imageUrl) {
    images.push({
      url: form.imageUrl,
      label: 'Cover Image',
      type: 'cover'
    })
  }

  form.galleryImageUrls.forEach((url, index) => {
    images.push({
      url,
      label: `Gallery Image ${index + 1}`,
      type: 'gallery',
      galleryIndex: index
    })
  })

  return images
})

const activePreviewImage = computed(() => {
  return previewImages.value[activeImageIndex.value] || null
})

function clampActiveImageIndex() {
  if (!previewImages.value.length) {
    activeImageIndex.value = 0
    return
  }

  if (activeImageIndex.value > previewImages.value.length - 1) {
    activeImageIndex.value = previewImages.value.length - 1
  }

  if (activeImageIndex.value < 0) {
    activeImageIndex.value = 0
  }
}

function goToPreviousImage() {
  if (!previewImages.value.length) {
    return
  }

  activeImageIndex.value =
    activeImageIndex.value === 0
      ? previewImages.value.length - 1
      : activeImageIndex.value - 1
}

function goToNextImage() {
  if (!previewImages.value.length) {
    return
  }

  activeImageIndex.value =
    activeImageIndex.value === previewImages.value.length - 1
      ? 0
      : activeImageIndex.value + 1
}

async function uploadCoverImage(event) {
  const file = event.target.files?.[0]

  if (!file) {
    return
  }

  isUploadingCover.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const result = await uploadService.uploadImage(file)
    form.imageUrl = result.imageUrl
    activeImageIndex.value = 0
    successMessage.value = 'Cover image uploaded successfully.'
  } catch (error) {
    errorMessage.value = error.message || 'Could not upload cover image.'
  } finally {
    isUploadingCover.value = false
    event.target.value = ''
  }
}

async function uploadGalleryImage(event) {
  const file = event.target.files?.[0]

  if (!file) {
    return
  }

  isUploadingGallery.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const result = await uploadService.uploadImage(file)

    if (!form.galleryImageUrls.includes(result.imageUrl)) {
      form.galleryImageUrls.push(result.imageUrl)
    }

    activeImageIndex.value = previewImages.value.length - 1
    successMessage.value = 'Gallery image uploaded successfully.'
  } catch (error) {
    errorMessage.value = error.message || 'Could not upload gallery image.'
  } finally {
    isUploadingGallery.value = false
    event.target.value = ''
  }
}

function removeCoverImage() {
  form.imageUrl = ''
  clampActiveImageIndex()
}

function removeGalleryImage(index) {
  form.galleryImageUrls.splice(index, 1)
  clampActiveImageIndex()
}

function moveGalleryImage(index, direction) {
  const newIndex = index + direction

  if (newIndex < 0 || newIndex >= form.galleryImageUrls.length) {
    return
  }

  const currentImage = form.galleryImageUrls[index]
  form.galleryImageUrls.splice(index, 1)
  form.galleryImageUrls.splice(newIndex, 0, currentImage)

  activeImageIndex.value = form.imageUrl ? newIndex + 1 : newIndex
}

function buildPayload() {
  return {
    title: form.title,
    description: form.description,
    imageUrl: form.imageUrl || null,
    galleryImageUrls: form.galleryImageUrls,
    liveUrl: form.liveUrl || null,
    githubUrl: form.githubUrl || null,
    techStack: form.techStack
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
    isFeatured: form.isFeatured
  }
}

async function saveProject() {
  isSaving.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const payload = buildPayload()

    if (isEditMode.value) {
      await projectService.updateProject(route.params.id, payload)
      successMessage.value = 'Project updated successfully.'
    } else {
      await projectService.createProject(payload)
      successMessage.value = 'Project created successfully.'
    }

    router.push('/admin/projects')
  } catch (error) {
    errorMessage.value = error.message || 'Could not save project.'
  } finally {
    isSaving.value = false
  }
}

async function loadProject() {
  if (!isEditMode.value) {
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const project = await projectService.getProjectById(route.params.id)

    form.title = project.title || ''
    form.description = project.description || ''
    form.imageUrl = project.imageUrl || ''
    form.galleryImageUrls = Array.isArray(project.galleryImageUrls)
      ? [...project.galleryImageUrls]
      : []
    form.liveUrl = project.liveUrl || ''
    form.githubUrl = project.githubUrl || ''
    form.techStack = Array.isArray(project.techStack)
      ? project.techStack.join(', ')
      : ''
    form.isFeatured = Boolean(project.isFeatured)
  } catch (error) {
    errorMessage.value = error.message || 'Could not load project.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadProject)
</script>

<template>
  <main class="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
    <section class="container mx-auto max-w-5xl">
      <div class="mb-8 flex flex-col justify-between gap-4 rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 md:flex-row md:items-center">
        <div>
          <p class="mb-2 font-semibold text-blue-600 dark:text-blue-400">
            Admin Panel
          </p>

          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ isEditMode ? 'Edit Project' : 'Add Project' }}
          </h1>
        </div>

        <RouterLink
          to="/admin/projects"
          class="rounded-xl border border-gray-300 px-5 py-3 text-center font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200"
        >
          Back to Projects
        </RouterLink>
      </div>

      <p
        v-if="isLoading"
        class="rounded-xl bg-white p-8 text-center text-gray-600 shadow-sm dark:bg-slate-900 dark:text-slate-300"
      >
        Loading project...
      </p>

      <form
        v-else
        @submit.prevent="saveProject"
        class="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900"
      >
        <p
          v-if="errorMessage"
          class="mb-5 rounded-xl bg-red-50 px-4 py-3 text-red-600 dark:bg-red-950 dark:text-red-300"
        >
          {{ errorMessage }}
        </p>

        <p
          v-if="successMessage"
          class="mb-5 rounded-xl bg-green-50 px-4 py-3 text-green-600 dark:bg-green-950 dark:text-green-300"
        >
          {{ successMessage }}
        </p>

        <div class="grid gap-6">
          <div>
            <label class="mb-2 block font-semibold text-gray-900 dark:text-white">
              Project Title
            </label>

            <input
              v-model="form.title"
              type="text"
              required
              class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div>
            <label class="mb-2 block font-semibold text-gray-900 dark:text-white">
              Description
            </label>

            <textarea
              v-model="form.description"
              required
              rows="10"
              class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            ></textarea>
          </div>

          <div class="grid gap-6 md:grid-cols-2">
            <div>
              <label class="mb-2 block font-semibold text-gray-900 dark:text-white">
                Cover Image
              </label>

              <input
                type="file"
                accept="image/*"
                @change="uploadCoverImage"
                class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />

              <p class="mt-2 text-sm text-gray-500 dark:text-slate-400">
                This image will show on project card and first in details page.
              </p>

              <p
                v-if="isUploadingCover"
                class="mt-2 text-sm font-semibold text-blue-600"
              >
                Uploading cover image...
              </p>
            </div>

            <div>
              <label class="mb-2 block font-semibold text-gray-900 dark:text-white">
                Gallery Images
              </label>

              <input
                type="file"
                accept="image/*"
                @change="uploadGalleryImage"
                class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />

              <p class="mt-2 text-sm text-gray-500 dark:text-slate-400">
                Upload one image at a time. Serial will be maintained.
              </p>

              <p
                v-if="isUploadingGallery"
                class="mt-2 text-sm font-semibold text-blue-600"
              >
                Uploading gallery image...
              </p>
            </div>
          </div>

          <div
            v-if="previewImages.length"
            class="rounded-2xl border border-gray-200 p-4 dark:border-slate-800"
          >
            <div class="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 class="font-bold text-gray-900 dark:text-white">
                  Image Preview
                </h2>

                <p class="text-sm text-gray-500 dark:text-slate-400">
                  {{ activePreviewImage?.label }}
                  · {{ activeImageIndex + 1 }} / {{ previewImages.length }}
                </p>
              </div>

              <div class="flex gap-2">
                <button
                  type="button"
                  @click="goToPreviousImage"
                  class="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-slate-800 dark:text-white"
                >
                  Previous
                </button>

                <button
                  type="button"
                  @click="goToNextImage"
                  class="rounded-lg bg-gray-100 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-200 dark:bg-slate-800 dark:text-white"
                >
                  Next
                </button>
              </div>
            </div>

            <img
              v-if="activePreviewImage"
              :src="activePreviewImage.url"
              :alt="activePreviewImage.label"
              class="mb-4 h-80 w-full rounded-2xl object-cover"
            />

            <div class="grid gap-3 md:grid-cols-4">
              <div
                v-for="(image, index) in previewImages"
                :key="image.url"
                class="rounded-xl border p-2 dark:border-slate-800"
                :class="index === activeImageIndex ? 'border-blue-600' : 'border-gray-200'"
              >
                <button
                  type="button"
                  @click="activeImageIndex = index"
                  class="block w-full"
                >
                  <img
                    :src="image.url"
                    :alt="image.label"
                    class="mb-2 h-24 w-full rounded-lg object-cover"
                  />

                  <p class="text-sm font-semibold text-gray-900 dark:text-white">
                    {{ image.label }}
                  </p>
                </button>

                <div class="mt-2 flex flex-wrap gap-2">
                  <button
                    v-if="image.type === 'cover'"
                    type="button"
                    @click="removeCoverImage"
                    class="rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white"
                  >
                    Remove
                  </button>

                  <template v-else>
                    <button
                      type="button"
                      @click="moveGalleryImage(image.galleryIndex, -1)"
                      class="rounded-md bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700 dark:bg-slate-700 dark:text-white"
                    >
                      Up
                    </button>

                    <button
                      type="button"
                      @click="moveGalleryImage(image.galleryIndex, 1)"
                      class="rounded-md bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700 dark:bg-slate-700 dark:text-white"
                    >
                      Down
                    </button>

                    <button
                      type="button"
                      @click="removeGalleryImage(image.galleryIndex)"
                      class="rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white"
                    >
                      Remove
                    </button>
                  </template>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label class="mb-2 block font-semibold text-gray-900 dark:text-white">
              Cover Image URL
            </label>

            <input
              v-model="form.imageUrl"
              type="url"
              class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div>
            <label class="mb-2 block font-semibold text-gray-900 dark:text-white">
              Live URL
            </label>

            <input
              v-model="form.liveUrl"
              type="url"
              class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div>
            <label class="mb-2 block font-semibold text-gray-900 dark:text-white">
              GitHub URL
            </label>

            <input
              v-model="form.githubUrl"
              type="url"
              class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div>
            <label class="mb-2 block font-semibold text-gray-900 dark:text-white">
              Tech Stack
            </label>

            <input
              v-model="form.techStack"
              type="text"
              placeholder="Vue, Tailwind CSS, ASP.NET Core"
              class="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />

            <p class="mt-2 text-sm text-gray-500 dark:text-slate-400">
              Separate each technology with a comma.
            </p>
          </div>

          <label class="flex items-center gap-3 font-semibold text-gray-900 dark:text-white">
            <input
              v-model="form.isFeatured"
              type="checkbox"
              class="h-5 w-5 rounded border-gray-300 text-blue-600"
            />

            Show this project in Featured Projects
          </label>

          <button
            type="submit"
            :disabled="isSaving || isUploadingCover || isUploadingGallery"
            class="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ isSaving ? 'Saving...' : isEditMode ? 'Update Project' : 'Create Project' }}
          </button>
        </div>
      </form>
    </section>
  </main>
</template>
