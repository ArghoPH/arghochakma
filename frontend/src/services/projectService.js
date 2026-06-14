const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? 'https://argho-portfolio-api.onrender.com'
    : 'http://localhost:5000')

const TOKEN_KEY = 'portfolio_admin_token'

const TECH_NAME_MAP = {
  vue: 'Vue',
  vuejs: 'Vue',
  vue3: 'Vue',
  vuex: 'Vuex',
  pinia: 'Pinia',

  vite: 'Vite',

  javascript: 'JavaScript',
  js: 'JavaScript',

  typescript: 'TypeScript',
  ts: 'TypeScript',

  tailwind: 'Tailwind CSS',
  tailwindcss: 'Tailwind CSS',

  css: 'CSS',
  html: 'HTML',

  react: 'React',
  reactjs: 'React',

  next: 'Next.js',
  nextjs: 'Next.js',

  node: 'Node.js',
  nodejs: 'Node.js',

  dotnet: '.NET',
  net: '.NET',

  aspnet: 'ASP.NET',
  aspnetcore: 'ASP.NET Core',

  csharp: 'C#',
  c: 'C',

  efcore: 'Entity Framework Core',
  entityframework: 'Entity Framework',
  entityframeworkcore: 'Entity Framework Core',

  postgres: 'PostgreSQL',
  postgresql: 'PostgreSQL',

  supabase: 'Supabase',
  docker: 'Docker',
  render: 'Render',
  vercel: 'Vercel',
  cloudinary: 'Cloudinary',

  api: 'API',
  restapi: 'REST API',

  sql: 'SQL',
  mysql: 'MySQL',
  mongodb: 'MongoDB',

  python: 'Python',
  php: 'PHP',
  laravel: 'Laravel',

  firebase: 'Firebase',
  git: 'Git',
  github: 'GitHub'
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

function normalizeTechKey(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/#/g, 'sharp')
    .replace(/\+/g, 'plus')
    .replace(/\./g, '')
    .replace(/-/g, '')
    .replace(/_/g, '')
    .replace(/\s+/g, '')
}

function toTitleCase(value) {
  return value
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((word) => {
      if (!word) return ''
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
}

export function normalizeTechName(value) {
  if (!value || typeof value !== 'string') {
    return ''
  }

  const cleanValue = value.trim()

  if (!cleanValue) {
    return ''
  }

  const key = normalizeTechKey(cleanValue)

  if (TECH_NAME_MAP[key]) {
    return TECH_NAME_MAP[key]
  }

  return toTitleCase(cleanValue)
}

export function normalizeTechStack(techStack) {
  if (!Array.isArray(techStack)) {
    return []
  }

  const normalized = techStack
    .map(normalizeTechName)
    .filter(Boolean)

  const unique = []

  for (const tech of normalized) {
    const exists = unique.some(
      (item) => item.toLowerCase() === tech.toLowerCase()
    )

    if (!exists) {
      unique.push(tech)
    }
  }

  return unique
}

function normalizeProject(project) {
  if (!project) {
    return project
  }

  return {
    ...project,
    techStack: normalizeTechStack(project.techStack)
  }
}

function normalizeProjectPayload(project) {
  return {
    ...project,
    techStack: normalizeTechStack(project.techStack)
  }
}

async function request(endpoint, options = {}) {
  const token = getToken()

  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  })

  const responseText = await response.text()

  if (!response.ok) {
    throw new Error(responseText || 'Request failed.')
  }

  if (!responseText) {
    return null
  }

  return JSON.parse(responseText)
}

export const projectService = {
  async getProjects() {
    const projects = await request('/api/projects')
    return Array.isArray(projects) ? projects.map(normalizeProject) : []
  },

  async getProjectById(id) {
    const project = await request(`/api/projects/${id}`)
    return normalizeProject(project)
  },

  async getProjectBySlug(slug) {
    const project = await request(`/api/projects/slug/${slug}`)
    return normalizeProject(project)
  },

  async createProject(project) {
    const payload = normalizeProjectPayload(project)

    const createdProject = await request('/api/projects', {
      method: 'POST',
      body: JSON.stringify(payload)
    })

    return normalizeProject(createdProject)
  },

  async updateProject(id, project) {
    const payload = normalizeProjectPayload(project)

    const updatedProject = await request(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    })

    return normalizeProject(updatedProject)
  },

  async deleteProject(id) {
    return request(`/api/projects/${id}`, {
      method: 'DELETE'
    })
  }
}
