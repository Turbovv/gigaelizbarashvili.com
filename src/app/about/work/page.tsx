"use client";
import { api } from "../../../trpc/react";
import Lines from "../lines";

export default function Personal() {
  const { data: skillsData, isLoading: isLoadingSkills, error: skillsError } =
    api.skills.getSkills.useQuery();

  const { data: interestsData, isLoading: isLoadingInterests, error: interestsError } =
    api.interests.getInterests.useQuery();

  if (isLoadingSkills || isLoadingInterests) return <div>Loading...</div>;
  if (skillsError || interestsError)
    return <div>Error: {skillsError?.message || interestsError?.message}</div>;

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

  const uniqueInterests = interestsData
    ? Array.from(new Set(interestsData.flat()))
    : [];
  const codeContent = `
const skills = {
  languages: [${uniqueSkills.languages.map(
    (lang) => `'${lang}'`
  )}],
  frameworks: [
    ${uniqueSkills.frameworks.map((framework) => `'${framework}'`).join(",\n")}
  ],
  databases: [${uniqueSkills.databases.map((db) => `'${db}'`)}],
  tools: [${uniqueSkills.tools.map((tool) => `'${tool}'`)}],
};

const interests =[
${uniqueInterests.map((interest) => `'${interest}'`).join(",\n  ")}
]
;

`;

  return (
    <div
      style={{
        display: "flex",
        fontFamily: "'Fira Code', monospace",
        color: "#d4d4d4",
        borderRadius: "8px",
        alignItems: "flex-start",
      }}
      className="overflow-y-auto lg:p-5 p-2 max-lg:w-[500px]"
    >
      <Lines content={codeContent} />

      <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", margin: 0 }}>
        <div>
        <p style={{ color: "rgb(145, 180, 213)" }}>
            const <span className="text-white">PROFESSION </span> = <span style={{ color: "rgb(93, 228, 199)" }}>'Software Developer'</span>
          </p>
          <p style={{ color: "rgb(145, 180, 213)" }}>
            const <span className="text-white">LOCATION </span> = <span style={{ color: "rgb(93, 228, 199)" }}>'Georgia, Rustavi'</span>
          </p><br />
          <p style={{ color: "rgba(118, 124, 157, 0.69)", fontStyle: "italic" }}>
            // Top Skills
          </p>
          <p style={{ color: "rgb(145, 180, 213)" }}>
            const <span className="text-white">skills</span> = <span style={{color: "rgb(166, 172, 205)"}}>&#123;</span>
          </p>
          <div style={{ paddingLeft: "20px" }}>
            <p>
              <span style={{ color: "rgb(173, 215, 255)" }}>languages</span>: <span style={{color: "rgb(166, 172, 205)"}}>[</span>
              <span style={{ color: "rgb(93, 228, 199)" }}>
                {uniqueSkills.languages.map(
                  (lang, idx) =>
                    `'${lang}'${idx < uniqueSkills.languages.length - 1 ? ", " : ""}`
                )}
              </span>
              <span style={{color: "rgb(166, 172, 205)"}}>]</span>
            </p>
            <p>
              <span style={{ color: "rgb(173, 215, 255)" }}>frameworks</span>: <span style={{color: "rgb(166, 172, 205)"}}>[</span>
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
            <p style={{color: "rgb(166, 172, 205)"}}>],</p>
            <p>
              <span style={{ color: "rgb(173, 215, 255)" }}>databases</span>:  <span style={{color: "rgb(166, 172, 205)"}}>[,</span>
              <span style={{ color: "rgb(93, 228, 199)" }}>
                {uniqueSkills.databases.map(
                  (db, idx) =>
                    `'${db}'${idx < uniqueSkills.databases.length - 1 ? ", " : ""}`
                )}
              </span>
              ],
            </p>
            <p>
              <span style={{ color: "rgb(173, 215, 255)" }}>tools</span>: <span style={{color: "rgb(166, 172, 205)"}}>[,</span>
              <span style={{ color: "rgb(93, 228, 199)" }}>
                {uniqueSkills.tools.map((tool, idx) => `'${tool}'`).join(", ")}
              </span>
              <span style={{color: "rgb(166, 172, 205)"}}>],</span>
            </p>
          </div>
          <p style={{ color: "#9cdcfe" }}>&#125;</p><br />

          <p style={{ color: "rgba(118, 124, 157, 0.69)", fontStyle: "italic" }}>
          // Fun Facts
          </p>
          <p style={{ color: "rgb(145, 180, 213)" }}>
            const <span style={{ color: "rgb(145, 180, 213)" }}>interests</span> =   <span style={{color: "rgb(166, 172, 205)"}}>[</span>
          </p>
          <div style={{ paddingLeft: "20px" }}>
            {uniqueInterests.map((interest, idx) => (
              <p key={idx}>
                <span style={{ color: "rgb(93, 228, 199)" }}>
                  '{interest.name}'{idx < uniqueInterests.length - 1 ? "," : ""} <br />
                </span>
              </p>
            ))}
          </div>
          <p style={{color: "rgb(166, 172, 205)"}}>];</p>
        </div>
      </div>
    </div>
  );
}
