/* ============================================================
   PORTFOLIO CONFIG — single place to edit ALL personal content
   Replace placeholders below with your real information.
   ============================================================ */
const portfolio = {
  name: "Bhavya Jain",
  shortName: "Bhavya",
  monogram: "B.",
  role: "AI Builder \u00d7 Web Developer",
  status: "Available for selected projects",
  intro: "I build modern web experiences, AI-powered products, automation systems and software tools.",

  // Hero
  heroLines: ["BUILDING", "DIGITAL", "EXPERIENCES."],

  // About
  aboutTitle: "Code meets product.",
  bio: [
    "I'm an independent builder interested in the intersection of AI, software and modern web experiences. I enjoy taking ideas from rough concepts to functional products \u2014 designing the interface, building the software, connecting APIs and shipping the final experience.",
    "My current focus is AI-powered applications, web development, automation, developer tools and experimenting with new ways to build software faster."
  ],
  experience: {
    period: "2026 \u2014 Present",
    role: "Independent Builder",
    detail: "Building AI applications, websites, automation systems, developer tools and software experiments."
  },
  exploring: [
    "AI Engineering", "LLMs", "RAG", "MCP",
    "Automation", "Full-Stack Development", "Creative Frontend", "SaaS"
  ],

  /* ----------------------------------------------------------
     CONTACT — real email for the Email buttons and contact form.
     ---------------------------------------------------------- */
  email: "threegamerboiz@gmail.com",
  github: "https://github.com/bhavyajindia",
  githubUser: "bhavyajindia",
  linkedin: "https://www.linkedin.com/in/bhavya-j-121468428/",

  /* ----------------------------------------------------------
     PROJECTS — real projects only.
     Leave demo/github empty ("") until a real URL exists:
     the UI shows "Coming soon" instead of a fake link.
     ---------------------------------------------------------- */
  projects: [
    {
      title: "GENZO",
      category: "AI / SOFTWARE / WEB",
      description: "GENZO is my broader software and AI-building ecosystem focused on creating practical AI-powered tools, websites and digital products.",
      technologies: ["AI", "Web", "APIs", "JavaScript", "Python"],
      demo: "",
      github: "",
      status: "Building"
    },
    {
      title: "AI VIBE CODEDX",
      category: "AI / DEVELOPER TOOL",
      description: "AI VIBE CODEDX is an AI-first development environment concept focused on turning product ideas and structured prompts into working software through AI-assisted development workflows.",
      technologies: ["AI", "OpenRouter", "GitHub", "APIs", "JavaScript"],
      demo: "",
      github: "",
      status: "Concept"
    },
    {
      title: "GENCLIPPER",
      category: "AI / VIDEO",
      description: "GENCLIPPER is an AI-powered video clipping concept designed to identify useful moments from long-form video and help transform them into short-form content.",
      technologies: ["AI", "Video Processing", "Computer Vision", "APIs"],
      demo: "",
      github: "",
      status: "Concept"
    },
    {
      title: "TASKTRIBE",
      category: "PRODUCTIVITY / WEB APP",
      description: "TASKTRIBE is a task and productivity tracking project designed around structured tasks, progress tracking and a modern web interface.",
      technologies: ["JavaScript", "Supabase", "SQL", "Web"],
      demo: "",
      github: "",
      status: "Building"
    },
    {
      title: "MR MOMOS 99",
      category: "CLIENT / LOCAL BUSINESS WEBSITE",
      description: "A modern restaurant website concept created for Mr. Momos 99, focused on presenting the menu, reviews, location and ordering experience through a responsive interface.",
      technologies: ["HTML", "CSS", "JavaScript", "Responsive Web Design"],
      demo: "",
      github: "",
      status: "Client / personal"
    }
  ],

  /* ----------------------------------------------------------
     STACK — radial system. note shows on hover / tap.
     Groups match the tech I actually work with.
     ---------------------------------------------------------- */
  skills: [
    { name: "WEB",       note: "HTML, CSS, JavaScript, responsive design." },
    { name: "AI",        note: "LLMs, OpenRouter, RAG, MCP, AI agents." },
    { name: "PYTHON",    note: "Backend scripting, automation and API work." },
    { name: "DATABASE",  note: "SQL and Supabase for real data." },
    { name: "AUTOMATION", note: "Automated workflows and software systems." },
    { name: "MCP",       note: "AI systems that can interact with external tools and services." },
    { name: "TOOLS",     note: "Git, GitHub, APIs and developer workflows." },
    { name: "SAAS",      note: "Product and subscription-style thinking." }
  ],

  /* ----------------------------------------------------------
     GITHUB SECTION
     The site loads your real public repos from the GitHub API
     (cached 1h, graceful fallback to the seed below on error /
     rate limit). No fake statistics are ever shown.
     ---------------------------------------------------------- */
  githubFallback: [
    { name: "webdev-portfolio-3d", description: "3D animated portfolio with liquid glass effects.", language: "HTML", url: "https://github.com/bhavyajindia/webdev-portfolio-3d" },
    { name: "GarlicPanic_KitchenKingdomCrisis", description: "Game project.", language: "GDScript", url: "https://github.com/bhavyajindia/GarlicPanic_KitchenKingdomCrisis" }
  ]
};