import SectionLabel from "./UI/SectionLabel";
import ProjectCard from "./UI/ProjectCard";

export default function Projects() {

    const PROJECTS = [
        {
            title: "Inventory Management & Analytics",
            desc: "Web-based inventory system for retail stores with real-time analytics, role-based access control, and comprehensive reporting features.",
            tags: ["Vue.js", "JavaScript", "MongoDB", "Node.js", "SocketIO"],
            link: "https://github.com/imnotuche/inventory-management"
        },
        {
            title: "Playlist Transfer App",
            desc: "Playlist transfer application that converts YouTube music playlists into Spotify playlists using automated track matching and API integration.",
            tags: ["Vue.js", "JavaScript", "Node.js", "MongoDB", "Spotify API", "Youtube Data API"],
            link: "https://github.com/imnotuche/playlist-transfer"
        },
        {
            title: "Unsupervised Image Clustering System",
            desc: "Unsupervised image clustering system using DINO embeddings, UMAP dimensionality reduction, and HDBSCAN clustering for semantic image grouping.",
            tags: ["Python", "DINO", "UMAP", "HDBSCAN", "PyTorch"],
            link: "https://github.com/imnotuche/Image-clustering-FYP"
        },
        {
            title: "Andora Messaging Platform (In Development)",
            desc: "Real-time messaging platform focused on fast communication, user presence, and scalable backend architecture.",
            tags: ["Python", "Flask", "Redis", "PostgreSQL", "React", "TypeScript", "SocketIO"],
            link: ""
        },
    ];

    return (
        <section
            id="projects"
            className="relative z-10 min-h-screen px-6 pt-25 pb-20 max-w-225 mx-auto"
        >
            <SectionLabel>02 — Projects</SectionLabel>
            <h2 className="text-[clamp(26px,4vw,36px)] text-white font-bold tracking-[-0.03em] leading-[1.2] mb-8">
                Selected Work
            </h2>
            <div className="grid gap-4.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
                {PROJECTS.map((p, i) => <ProjectCard key={i} {...p} index={i} />)}
            </div>
        </section>
    );
}