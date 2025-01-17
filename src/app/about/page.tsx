"use client";
import { api } from "../../trpc/react";
import Lines from "./lines";

export default function About() {
  const { data: skillsData, isLoading, error } = api.skills.getSkills.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const skills = skillsData?.reduce(
    (acc, skill) => {
      acc.languages.push(...skill.languages);
      acc.frameworks.push(...skill.frameworks);
      acc.databases.push(...skill.databases);
      acc.tools.push(...skill.tools);
      return acc;
    },
    {
      languages: [],
      frameworks: [],
      databases: [],
      tools: [],
    }
  );

  const uniqueSkills = skills
    ? {
        languages: Array.from(new Set(skills.languages.flat())),
        frameworks: Array.from(new Set(skills.frameworks.flat())),
        databases: Array.from(new Set(skills.databases.flat())),
        tools: Array.from(new Set(skills.tools.flat())),
      }
    : { languages: [], frameworks: [], databases: [], tools: [] };

  const codeContent = `// Top Skills
const skills = {
  languages: [${uniqueSkills.languages.map((lang) => `'${lang}'`).join(", ")}],
  frameworks: [
    ${uniqueSkills.frameworks.map((framework) => `'${framework}'`).join(",\n    ")}
  ],
  databases: [${uniqueSkills.databases.map((db) => `'${db}'`).join(", ")}],
  tools: [
    ${uniqueSkills.tools.map((tool) => `'${tool}'`).join(",\n    ")}
  ]
}`;

  return (
    <div
      style={{
        display: "flex",
        fontFamily: "'Fira Code', monospace",
        color: "#d4d4d4",
        padding: "20px",
        borderRadius: "8px",
        alignItems: "flex-start",
      }}
    >
      <Lines content={codeContent} />

      <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }}>
        <div>
          <span style={{ color: "rgba(118, 124, 157, 0.69)", fontStyle: "italic" }}>
            // Top Skills
          </span>
          <p style={{ color: "rgb(145, 180, 213)" }}>
            const <span className="text-white">skills</span> = &#123;
          </p>
          <div style={{ paddingLeft: "20px" }}>
            <p>
              <span style={{ color: "rgb(173, 215, 255)" }}>languages</span>: [
              <span style={{ color: "rgb(93, 228, 199)" }}>
                {uniqueSkills.languages.map(
                  (lang, idx) =>
                    `'${lang}'${idx < uniqueSkills.languages.length - 1 ? ", " : ""}`
                )}
              </span>
              ],
            </p>
            <p>
              <span style={{ color: "rgb(173, 215, 255)" }}>frameworks</span>: [
            </p>
            <div style={{ paddingLeft: "20px" }}>
              {uniqueSkills.frameworks.map((framework, idx) => (
                <p key={idx}>
                  <span style={{ color: "rgb(93, 228, 199)" }}>
                    '{framework}'{idx < uniqueSkills.frameworks.length - 1 ? "," : ""}
                  </span>
                </p>
              ))}
            </div>
            <p>],</p>
            <p>
              <span style={{ color: "rgb(173, 215, 255)" }}>databases</span>: [
              <span style={{ color: "rgb(93, 228, 199)" }}>
                {uniqueSkills.databases.map(
                  (db, idx) =>
                    `'${db}'${idx < uniqueSkills.databases.length - 1 ? ", " : ""}`
                )}
              </span>
              ],
            </p>
            <p>
              <span style={{ color: "rgb(173, 215, 255)" }}>tools</span>: [
            </p>
            <div style={{ paddingLeft: "20px" }}>
              {uniqueSkills.tools.map((tool, idx) => (
                <p key={idx}>
                  <span style={{ color: "rgb(93, 228, 199)" }}>
                    '{tool}'{idx < uniqueSkills.tools.length - 1 ? "," : ""}
                  </span>
                </p>
              ))}
            </div>
            <p>]</p>
          </div>
          <p style={{ color: "#9cdcfe" }}>&#125;</p>
        </div>
      </div>
    </div>
  );
}
