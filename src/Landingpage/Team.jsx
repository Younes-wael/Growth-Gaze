const team_data = [
    {
        vorname: "Luan",
        profileImg: "/Team/Luan.jpg",
        role: "Tech Lead & Architect",
        tasks: ["Framework Setup", "Code Refactoring", "Tutorial System"],
        link: "#"
    },
    {
        vorname: "Chai",
        profileImg: "/Team/Chai.jpg",
        role: "Research & Analytics",
        tasks: ["User Interviews", "KPI Framework"],
        link: "https://www.instagram.com/c.srcht/?igsh=OWZqZDdsb2hvcXl5&utm_source=qr"
    },
    {
        vorname: "Nikan",
        profileImg: "/Team/NikanCool.jpg",
        role: "Frontend Developer",
        tasks: ["Search/Sidebar", "KPI Integration", "UI Components"],
        link: "https://n1kan.github.io/myCV/"
    },
    {
        vorname: "Wael",
        profileImg: "/Team/Wael2.jpg",
        role: "AI Solutions & Developer",
        tasks: ["AI Data Generation", "Dashboard Design", "UI Architecture"],
        link: "https://younes-wael.github.io/Resume/"
    }
];

const Team = () => {
    return (
        <section className="bg-[#151D48] py-12">
            <div className="mx-auto max-w-screen-xl px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-[#00df9a] mb-4">
                        Our Team
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        The minds behind GrowthGaze's innovation
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {team_data.map((member) => (
                        <div
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                            key={member.vorname}
                        >
                            <a href={member.link} target="_blank" rel="noopener noreferrer">
                                <img
                                    className="w-full h-64 object-cover"
                                    src={member.profileImg}
                                    alt={member.vorname}
                                />
                            </a>

                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800">
                                    <a href={member.link} target="_blank" rel="noopener noreferrer">
                                        {member.vorname}
                                    </a>
                                </h3>
                                <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">
                                    {member.role}
                                </p>
                                <ul className="mt-4 space-y-2">
                                    {member.tasks.map((task, i) => (
                                        <li key={i} className="flex items-center">
                                            <span className="w-1.5 h-1.5 bg-[#00df9a] rounded-full mr-2"></span>
                                            <span className="text-gray-600">{task}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;