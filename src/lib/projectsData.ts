export const projectsData = [
    {
        id: "1",
        title: "Todo App",
        description: "Built a responsive, minimalist Todo application leveraging React and browser's local storage. Focused on user experience, incorporating smooth interactions and intuitive UI design. Gained practical insight into state management and front-end optimization.",
        thumbnail: "/projects/todo-app.svg",
        techStack: ["ReactJS", "JavaScript", "Local Storage", "CSS3", "Responsive Design"],
        githubUrl: "https://github.com/gouravgupta/todo-app",
        liveUrl: "https://gouravgupta-todo.vercel.app"
    },
    {
        id: "2",
        title: "Portfolio Website (MERN Stack)",
        description: "Developed a fully dynamic personal portfolio website using MongoDB, Express.js, React.js, and Node.js. Designed an immersive user interface showcasing professional achievements, skills, and projects. Integrated backend APIs and optimized performance for a fluid, real-time experience. Embodied modern web aesthetics — clean UI, smooth transitions, and mobile responsiveness.",
        thumbnail: "/projects/portfolio.svg",
        techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "REST API", "Responsive Design"],
        githubUrl: "https://github.com/gouravgupta/portfolio-mern",
        liveUrl: "https://gouravgupta.com"
    },
    {
        id: "3",
        title: "Nutty App - Notes Management",
        description: "A scalable notes management application built with MERN stack. Implemented Redis caching for enhanced performance and rate limiting to prevent abuse. Features real-time updates and secure authentication.",
        thumbnail: "/projects/nutty.svg",
        techStack: ["React", "Node.js", "MongoDB", "Express.js", "Redis", "Rate Limiter"],
        githubUrl: "https://github.com/gouravgupta/nutty-app",
        liveUrl: "https://nutty-app-demo.com"
    },
    {
        id: "4",
        title: "E-Commerce Platform",
        description: "Full-featured online shopping platform with real-time inventory management, payment processing via Stripe, and admin dashboard. Supports multiple vendors and advanced search filters.",
        thumbnail: "/projects/ecommerce.svg",
        techStack: ["Next.js", "PostgreSQL", "Stripe", "TypeScript", "Prisma", "TailwindCSS"],
        githubUrl: "https://github.com/gouravgupta/ecommerce",
        liveUrl: "https://shop-demo.com"
    },
    {
        id: "5",
        title: "Weather Forecast App",
        description: "Beautiful weather application with 7-day forecasts, interactive maps, severe weather alerts, and location-based recommendations. Features smooth animations and dark mode support.",
        thumbnail: "/projects/weather.svg",
        techStack: ["React Native", "OpenWeather API", "Redux", "Mapbox", "AsyncStorage"],
        githubUrl: "https://github.com/gouravgupta/weather-app",
        liveUrl: "https://weather-app-demo.com"
    },
    {
        id: "6",
        title: "3D Interactive Portfolio",
        description: "Cutting-edge portfolio featuring WebGPU-powered 3D graphics, holographic effects, and cinematic post-processing. Built with React Three Fiber and custom GLSL shaders.",
        thumbnail: "/projects/3d-portfolio.svg",
        techStack: ["Next.js", "Three.js", "WebGPU", "GLSL", "React Three Fiber", "Framer Motion"],
        githubUrl: "https://github.com/gouravgupta/3d-portfolio",
        liveUrl: "https://gouravgupta-3d.vercel.app"
    }
];

export type ProjectData = typeof projectsData[0];
