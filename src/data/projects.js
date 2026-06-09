import videoToGif from '@/images/video-to-gif.png'

export const projects = [
  {
    id: 1,
    title: 'Video to GIF Converter',
    description:
      'A web app that converts video files to GIF format using JavaScript and HTML5.',
    image: videoToGif,
    tech: ['Vue', 'Tailwind', 'Vite'],
    liveLink: 'https://video-to-gif-converter-one.vercel.app/',
    githubLink: 'https://github.com/ArghoPH/Video-to-GIF-Converter',
  },

  {
    id: 2,
    title: 'Code with Dotnet',
    description:
      'A documentation website for .NET developers, built with Vue and Tailwind CSS.',
    image: '/images/code-with-dotnet.png',
    tech: ['Vue', 'Tailwind', 'JavaScript'],
    liveLink: 'https://your-live-link.com',
    githubLink: 'https://github.com/yourusername/code-with-dotnet',
  },

  {
    id: 3,
    title: 'Weather App',
    description:
      'A weather application that fetches live weather data from an API.',
    image: '/images/weather.png',
    tech: ['JavaScript', 'API', 'Tailwind'],
    liveLink: 'https://your-live-link.com',
    githubLink: 'https://github.com/yourusername/weather-app',
  },
]