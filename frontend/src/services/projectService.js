import { authService } from '@/services/authService'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? 'https://argho-portfolio-api.onrender.com' : 'http://localhost:5000')

async function request(path, options = {}) {
  const token = authService.getToken()

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'API request failed')
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export const projectService = {
  getProjects() {
    return request('/api/projects')
  },

  getProjectBySlug(slug) {
    return request(`/api/projects/slug/${slug}`)
  },

  getProjectById(id) {
    return request(`/api/projects/${id}`)
  },

  createProject(payload) {
    return request('/api/projects', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },

  updateProject(id, payload) {
    return request(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  },

  deleteProject(id) {
    return request(`/api/projects/${id}`, {
      method: 'DELETE',
    })
  },
}

