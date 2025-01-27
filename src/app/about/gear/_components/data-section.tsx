import React from "react";

type DataSectionProps = {
  title: string;
  data: { name: string; desc: string; tags: string }[];
};

export default function DataSection({ title, data }: DataSectionProps) {
  return (
    <>
      <p style={{ color: "rgb(145, 180, 213)", fontStyle: "italic" }}>
        const <span className="text-white">{title}</span> = <span style={{ color: "rgb(166, 172, 205)" }}>[</span>
      </p>
      <div style={{ paddingLeft: "20px" }}>
        {data?.map((item, idx) => (
          <p key={idx}>
            <span>
              <span style={{ color: "rgb(166, 172, 205)" }}>
                &#123;
              </span>
              <br />
              <span className="ml-5" style={{ color: "rgb(173, 215, 255)" }}>name:</span>
              <span style={{ color: "rgb(93, 228, 199)" }}>
                {' '}
                '{item.name}',
              </span>
              <br />
              <span className="ml-5" style={{ color: "rgb(173, 215, 255)" }}>desc:</span>
              <span style={{ color: "rgb(93, 228, 199)" }}>
                {' '}
                '{item.desc}',
              </span>
              <br />
              <span className="ml-5" style={{ color: "rgb(173, 215, 255)" }}>tags:</span>
              <span style={{ color: "rgb(93, 228, 199)" }}>
                {' '}
                '{item.tags}',
              </span>
              <br />
              <span style={{ color: "rgb(166, 172, 205)" }}>
                &#125;,
              </span>
            </span>
          </p>
        ))}
      </div>
      <p style={{ color: "rgb(145, 180, 213)", fontStyle: "italic" }}>
        ];
      </p>
    </>
  );
}