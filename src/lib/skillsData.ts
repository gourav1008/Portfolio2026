export const skillsData = [
    {
        category: "Frontend",
        items: [
            { name: "HTML", level: 95, color: "#E34F26" },
            { name: "CSS", level: 95, color: "#1572B6" },
            { name: "JavaScript", level: 95, color: "#F7DF1E" },
            { name: "ReactJS", level: 90, color: "#61DAFB" },
            { name: "Bootstrap", level: 85, color: "#7952B3" },
            { name: "Tailwind CSS", level: 85, color: "#06B6D4" },
            { name: "Responsive Design", level: 90, color: "#00F0FF" }
        ]
    },
    {
        category: "Backend",
        items: [
            { name: "NodeJS", level: 90, color: "#68A063" },
            { name: "ExpressJS", level: 90, color: "#000000" },
            { name: "REST API", level: 85, color: "#00F0FF" }
        ]
    },
    {
        category: "Database",
        items: [
            { name: "MongoDB", level: 85, color: "#47A248" },
            { name: "Database Design", level: 80, color: "#336791" }
        ]
    },
    {
        category: "Tools & Platforms",
        items: [
            { name: "VS Code", level: 95, color: "#007ACC" },
            { name: "Git & GitHub", level: 90, color: "#F05032" },
            { name: "Postman", level: 85, color: "#FF6C37" },
            { name: "Version Control", level: 90, color: "#F05032" }
        ]
    },
    {
        category: "Soft Skills",
        items: [
            { name: "Creative Thinking", level: 90, color: "#7000FF" },
            { name: "Team Collaboration", level: 95, color: "#00F0FF" },
            { name: "Communication", level: 90, color: "#FF6B6B" },
            { name: "Problem Solving", level: 95, color: "#4ECDC4" },
            { name: "Leadership", level: 85, color: "#FFD93D" },
            { name: "Adaptability", level: 90, color: "#95E1D3" }
        ]
    }
];

export type Skill = typeof skillsData[0]["items"][0];
export type SkillCategory = typeof skillsData[0];
