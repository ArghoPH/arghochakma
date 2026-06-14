<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { projectService } from '@/services/projectService'
import { uploadService } from '@/services/uploadService'

const route = useRoute()
const router = useRouter()

const isEditMode = computed(() => Boolean(route.params.id))

const isLoading = ref(false)
const isSaving = ref(false)
const isUploadingImage = ref(false)
const errorMessage = ref('')
const imageUploadMessage = ref('')

const form = ref({
  title: '',
  description: '',
  imageUrl: '',
  liveUrl: '',
  githubUrl: '',
  techStackText: '',
  isFeatured: false,
})

function buildPayload() {
  return {
    title: form.value.title.trim(),
    description: form.value.description.trim(),
    imageUrl: form.value.imageUrl.trim() || null,
    liveUrl: form.value.liveUrl.trim() || null,
    githubUrl: form.value.githubUrl.trim() || null,
    techStack: form.value.techStackText
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean),
    isFeatured: form.value.isFeatured,
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

    form.value = {
      title: project.title || '',
      description: project.description || '',
      imageUrl: project.imageUrl || '',
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      techStackText: project.techStack?.join(', ') || '',
      isFeatured: Boolean(project.isFeatured),
    }
  } catch (error) {
    errorMessage.value = 'Could not load project.'
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

async function handleImageChange(event) {
  const file = event.target.files?.[0]

  if (!file) {
    return
  }

  imageUploadMessage.value = ''
  errorMessage.value = ''
  isUploadingImage.value = true

  try {
    const result = await uploadService.uploadImage(file)
    form.value.imageUrl = result.imageUrl
    imageUploadMessage.value = 'Image uploaded successfully.'
  } catch (error) {
    errorMessage.value = 'Could not upload image.'
    console.error(error)
  } finally {
    isUploadingImage.value = false
    event.target.value = ''
  }
}

async function handleSubmit() {
  errorMessage.value = ''
  isSaving.value = true

  try {
    const payload = buildPayload()

    if (isEditMode.value) {
      await projectService.updateProject(route.params.id, payload)
    } else {
      await projectService.createProject(payload)
    }

    router.push('/admin/projects')
  } catch (error) {
    errorMessage.value = 'Could not save project.'
    console.error(error)
  } finally {
    isSaving.value = false
  }
}

onMounted(loadProject)
</script>

<template>
  <main class="min-h-screen bg-gray-50 px-4 py-10 dark:bg-gray-950">
    <section class="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 md:p-8">
      <div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p class="mb-2 font-semibold text-blue-600 dark:text-blue-400">Admin Panel</p>

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
        class="rounded-xl bg-gray-50 px-5 py-8 text-center text-gray-600 dark:bg-slate-950 dark:text-slate-300"
      >
        Loading project...
      </p>

      <form v-else @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="mb-2 block font-medium text-gray-700 dark:text-slate-200">
            Project Title
          </label>
          <input
            v-model="form.title"
            type="text"
            required
            class="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            placeholder="Example: Portfolio Website"
          />
        </div>

        <div>
          <label class="mb-2 block font-medium text-gray-700 dark:text-slate-200">
            Description
          </label>
          <textarea
            v-model="form.description"
            required
            rows="5"
            class="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            placeholder="Write a short project description"
          ></textarea>
        </div>

        <div class="rounded-2xl border border-gray-200 p-5 dark:border-slate-700">
          <label class="mb-2 block font-medium text-gray-700 dark:text-slate-200">
            Project Image
          </label>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            @change="handleImageChange"
            class="mb-4 block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-blue-700 dark:text-slate-300"
          />

          <p
            v-if="isUploadingImage"
            class="mb-3 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700 dark:bg-blue-950 dark:text-blue-300"
          >
            Uploading image...
          </p>

          <p
            v-if="imageUploadMessage"
            class="mb-3 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-950 dark:text-green-300"
          >
            {{ imageUploadMessage }}
          </p>

          <input
            v-model="form.imageUrl"
            type="text"
            class="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            placeholder="Image URL will appear here after upload"
          />

          <img
            v-if="form.imageUrl"
            :src="form.imageUrl"
            alt="Project preview"
            class="mt-4 h-56 w-full rounded-2xl object-cover"
          />
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label class="mb-2 block font-medium text-gray-700 dark:text-slate-200">
              Live URL
            </label>
            <input
              v-model="form.liveUrl"
              type="url"
              class="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label class="mb-2 block font-medium text-gray-700 dark:text-slate-200">
              GitHub URL
            </label>
            <input
              v-model="form.githubUrl"
              type="url"
              class="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="https://github.com/username/repo"
            />
          </div>
        </div>

        <div>
          <label class="mb-2 block font-medium text-gray-700 dark:text-slate-200">
            Tech Stack
          </label>
          <input
            v-model="form.techStackText"
            type="text"
            class="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            placeholder="Vue, Tailwind, ASP.NET Core, PostgreSQL"
          />
          <p class="mt-2 text-sm text-gray-500 dark:text-slate-400">
            Separate each technology with a comma.
          </p>
        </div>

        <label class="flex items-center gap-3 rounded-xl border border-gray-200 p-4 dark:border-slate-700">
          <input
            v-model="form.isFeatured"
            type="checkbox"
            class="h-5 w-5"
          />
          <span class="font-medium text-gray-700 dark:text-slate-200">
            Show this project in Featured Projects
          </span>
        </label>

        <p
          v-if="errorMessage"
          class="rounded-xl bg-red-50 px-4 py-3 text-red-600 dark:bg-red-950 dark:text-red-300"
        >
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          :disabled="isSaving || isUploadingImage"
          class="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ isSaving ? 'Saving...' : isEditMode ? 'Update Project' : 'Create Project' }}
        </button>
      </form>
    </section>
  </main>
</template>
