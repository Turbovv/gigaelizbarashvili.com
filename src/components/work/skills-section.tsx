interface Skills {
  languages: string[];
  frameworks: string[];
  databases: string[];
  tools: string[];
}

export default function SkillsSection({ uniqueSkills }: { uniqueSkills: Skills }) {
  return (
    <>
      <p style={{ color: "rgb(145, 180, 213)" }}>
        const <span className="text-white">skills</span> = <span className="text-gray-400">&#123;</span>
      </p>
      <div className="pl-5">
        <p>
          <span className="text-blue-300">languages</span>: <span className="text-gray-400">[</span>
          <span style={{ color: "rgb(93, 228, 199)" }}>
            {uniqueSkills.languages.map((lang, idx) => `'${lang}'${idx < uniqueSkills.languages.length - 1 ? ", " : ""}`)}
          </span>
          <span className="text-gray-400">],</span>
        </p>
        <p>
          <span className="text-blue-300">frameworks</span>: <span className="text-gray-400">[</span>
        </p>
        <div className="pl-5">
          {uniqueSkills.frameworks.map((framework, idx) => (
            <p key={idx}>
              <span style={{ color: "rgb(93, 228, 199)" }}>
                '{framework}'{idx < uniqueSkills.frameworks.length - 1 ? "," : ""}
              </span>
            </p>
          ))}
        </div>
        <p className="text-gray-400">],</p>
        <p>
          <span className="text-blue-300">databases</span>: <span className="text-gray-400">[</span>
          <span style={{ color: "rgb(93, 228, 199)" }}>
            {uniqueSkills.databases.map((db, idx) => `'${db}'${idx < uniqueSkills.databases.length - 1 ? ", " : ""}`)}
          </span>
          <span className="text-gray-400">],</span>
        </p>
        <p>
          <span className="text-blue-300">tools</span>: <span className="text-gray-400">[</span>
          <span style={{ color: "rgb(93, 228, 199)" }}>
            {uniqueSkills.tools.map((tool, idx) => `'${tool}'`).join(", ")}
          </span>
          <span className="text-gray-400">],</span>
        </p>
      </div>
      <p style={{ color: "rgb(145, 180, 213)" }}>&#125;</p>
    </>
  );
}