"use client"
import { api } from "~/trpc/react";
import Lines from "../lines";

export default function Page() {
    const { data: softwaresData } = api.softwares.getSoftwares.useQuery();
  
    const codeLines = softwaresData
      ?.map(
        (software) => `
  [
    name: '${software.name}',
    desc: '${software.desc}',
    tags: '${software.tags}',
  ]
  `
      )
      .join("")
      .trim();
  
    const content = `
  const software = [
  ${codeLines}
  ];
  `.trim();
  
    return (
      <div
        style={{
          display: "flex",
          fontFamily: "'Fira Code', monospace",
          padding: "20px",
          color: "#d4d4d4",
        }}
      >
        <Lines content={content} />
  
        <div>
          <p style={{ color: "rgb(145, 180, 213)", fontStyle: "italic" }}>
            const <span className="text-white">software</span> = [
          </p>
          <div style={{ paddingLeft: "20px" }}>
            {softwaresData?.map((interest, idx) => (
              <p key={idx}>
                <span>
                  [
                  <br />
                  <span style={{ color: "rgb(173, 215, 255)" }}>name:</span>
                  <span style={{ color: "rgb(93, 228, 199)" }}>
                    {' '}
                    '{interest.name}',
                  </span>
                  <br />
                  <span style={{ color: "rgb(173, 215, 255)" }}>desc:</span>
                  <span style={{ color: "rgb(93, 228, 199)" }}>
                    {' '}
                    '{interest.desc}',
                  </span>
                  <br />
                  <span style={{ color: "rgb(173, 215, 255)" }}>tags:</span>
                  <span style={{ color: "rgb(93, 228, 199)" }}>
                    {' '}
                    '{interest.tags}',
                  </span>
                  <br />
                  ]
                </span>
              </p>
            ))}
          </div>
          <p>];</p>
        </div>
      </div>
    );
  }
