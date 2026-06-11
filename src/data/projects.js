import videoToGif from '@/images/video-to-gif.png'

export const projects = [
 
  {
    id: 1,
    title: 'ShopSphere E-commerce Platform',
    description:
      'Production-ready, full-stack e-commerce solution built using a decoupled architecture.',
    image: '/images/ecommerce-website.png',
tech: [
  'Vue',
  'Vite',
  'Tailwind CSS',
  'ASP.NET Core',
  'C#',
  'Entity Framework Core',
  'PostgreSQL',
  'Supabase',
  'Docker',
  'Render',
  'Vercel'
],
    liveLink: 'https://shopsphere-red.vercel.app/',
    githubLink: 'https://github.com/ArghoPH/shopsphere',
  },

  {
    id: 2,
    title: 'Code with Dotnet',
    description:
      'A documentation website for .NET developers, built with Vue and Tailwind CSS.',
    image: '/images/code-with-dotnet.png',
    tech: ['Vue', 'Tailwind', 'JavaScript'],
    liveLink: 'https://codewithdotnet.vercel.app/',
    githubLink: 'https://github.com/ArghoPH/codewithdotnet',
  },

  {
    id: 3,
    title: 'Video Crop & Trim',
    description:
      'A video editing app that allows users to crop and trim video clips.',
    image: '/images/video-crop-trim.png',
    tech: ['Vue', 'Tailwind', 'JavaScript'],
    liveLink: 'https://video-crop-and-trim.vercel.app/',
    githubLink: 'https://github.com/ArghoPH/Video-Crop-and-Trim',
  },



   {
    id: 4,
    title: 'Video to GIF Converter',
    description:
      'A web app that converts video files to GIF format using JavaScript and HTML5.',
    image: videoToGif,
    tech: ['Vue', 'Tailwind', 'Vite'],
    liveLink: 'https://video-to-gif-converter-one.vercel.app/',
    githubLink: 'https://github.com/ArghoPH/Video-to-GIF-Converter',
  },
    
 
]