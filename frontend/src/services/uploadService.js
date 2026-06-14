const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? 'https://argho-portfolio-api.onrender.com'
    : 'http://localhost:5000')

const TOKEN_KEY = 'portfolio_admin_token'

function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export const uploadService = {
  async uploadImage(file) {
    const token = getToken()

    if (!token) {
      throw new Error('You are not logged in.')
    }

    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${API_BASE_URL}/api/uploads/image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    const responseText = await response.text()

    if (!response.ok) {
      throw new Error(responseText || 'Image upload failed.')
    }

    return JSON.parse(responseText)
  }
}
