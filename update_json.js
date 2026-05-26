const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'projects.json');
let projects = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const newProjects = [
    {
        id: 7,
        title: "Sketch to 3D Model AI",
        category: "Generative AI",
        description: "An advanced Deep Learning and Computer Vision pipeline that takes 2D hand-drawn sketches or images and reconstructs them into fully textured 3D models. Built using Python, leveraging neural radiance fields and generative models to bridge the gap between 2D concept art and 3D assets.",
        link: "https://github.com/Arbazkhan-ai/sketch-to-3d-model",
        githubLink: "https://github.com/Arbazkhan-ai/sketch-to-3d-model",
        color: "var(--color-accent-amber)",
        image: "/sketch-to-3d.png",
        tags: ["Python", "Generative AI", "3D Modeling", "Computer Vision"]
    },
    {
        id: 8,
        title: "Rainbow Hands Pose Tracking",
        category: "Computer Vision",
        description: "Real-time hand pose estimation and gesture recognition system. Uses Google's MediaPipe to track 21 3D landmarks of a hand from a single RGB camera. Features custom visualizations and optimized tracking algorithms for robust augmented reality interactions.",
        link: "https://github.com/Arbazkhan-ai/rambows-Hands",
        githubLink: "https://github.com/Arbazkhan-ai/rambows-Hands",
        color: "var(--color-accent-pink)",
        image: "/rainbow-hands.png",
        tags: ["Python", "MediaPipe", "OpenCV", "Pose Estimation"]
    },
    {
        id: 9,
        title: "Cineverse Movie Platform",
        category: "Web Development",
        description: "A sleek, responsive movie discovery platform featuring a modern UI. Built with HTML, CSS, and modern JavaScript, Cineverse allows users to browse movies, view detailed cinematic information, and discover trending content across the entertainment universe.",
        link: "https://github.com/Arbazkhan-ai/cineverse",
        githubLink: "https://github.com/Arbazkhan-ai/cineverse",
        color: "var(--color-accent-blue)",
        image: "/cineverse.png",
        tags: ["HTML", "CSS", "JavaScript", "UI/UX"]
    }
];

// Avoid duplicates
const existingTitles = new Set(projects.map(p => p.title));
newProjects.forEach(np => {
    if (!existingTitles.has(np.title)) {
        projects.push(np);
    }
});

fs.writeFileSync(filePath, JSON.stringify(projects, null, 4));
console.log('Updated projects.json');
