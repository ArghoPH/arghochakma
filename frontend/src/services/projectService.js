const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
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
}
