"use client";
import SkillsSection from "~/components/work/skills-section";
import { api } from "../../../trpc/react";
import Lines from "../lines";
import InterestsSection from "~/components/work/interests-section";
export default function Personal() {
  const { data: skillsData, isLoading: isLoadingSkills, error: skillsError } = api.skills.getSkills.useQuery();
  const { data: interestsData, isLoading: isLoadingInterests, error: interestsError } = api.interests.getInterests.useQuery();

  if (isLoadingSkills || isLoadingInterests) return <div>Loading...</div>;
  if (skillsError || interestsError) return <div>Error: {skillsError?.message || interestsError?.message}</div>;

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

  const uniqueInterests = interestsData ? Array.from(new Set(interestsData.flat())) : [];

  const codeContent = `
const skills = {
  languages: [${uniqueSkills.languages.map((lang) => `'${lang}'`)}],
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
    <div className="flex font-mono text-gray-300 rounded-lg items-start overflow-y-auto lg:p-5 p-2 max-lg:w-[500px]">
      <Lines content={codeContent} />
      <div className="whitespace-pre-wrap break-words m-0">
        <div>
          <p style={{ color: "rgb(145, 180, 213)" }}>
            const <span className="text-white">PROFESSION </span> = <span style={{ color: "rgb(93, 228, 199)" }}>'Software Developer'</span>
          </p>
          <p style={{ color: "rgb(145, 180, 213)" }}>
            const <span className="text-white">LOCATION </span> = <span style={{ color: "rgb(93, 228, 199)" }}>'Georgia, Rustavi'</span>
          </p>
          <br />
          <p className="text-gray-500 italic">// Top Skills</p>
          <SkillsSection uniqueSkills={uniqueSkills} />
          <br />
          <p className="text-gray-500 italic">// Fun Facts</p>
          <InterestsSection uniqueInterests={uniqueInterests} />
        </div>
      </div>
    </div>
  );
}