import { authService } from '@/services/authService'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? 'https://argho-portfolio-api.onrender.com' : 'http://localhost:5000')

export const uploadService = {
  async uploadImage(file) {
    const token = authService.getToken()

    if (!token) {
      throw new Error('Admin token is missing.')
    }

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${API_BASE_URL}/api/uploads/image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const message = await response.text()
      throw new Error(message || 'Image upload failed')
    }

    return response.json()
  },
}

