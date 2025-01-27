interface Interest {
  name: string;
}

interface InterestsSectionProps {
  uniqueInterests: Interest[];
}

export default function InterestsSection({ uniqueInterests }: InterestsSectionProps) {
    return (
      <>
        <p style={{ color: "rgb(145, 180, 213)" }}>
          const <span>interests</span> = <span className="text-gray-400">[</span>
        </p>
        <div className="pl-5">
          {uniqueInterests.map((interest, idx) => (
            <p key={idx}>
              <span style={{ color: "rgb(93, 228, 199)" }}>
                '{interest.name}'{idx < uniqueInterests.length - 1 ? "," : ""} <br />
              </span>
            </p>
          ))}
        </div>
        <p className="text-gray-400">];</p>
      </>
    );
  }