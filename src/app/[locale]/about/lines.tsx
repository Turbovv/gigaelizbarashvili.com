interface LineNumberComponentProps {
    content: string;
  }
  
  export default function Lines({ content }: LineNumberComponentProps) {
  const lines = content.split("\n");

  return (
    <div
      style={{
        marginRight: "16px",
        textAlign: "right",
        userSelect: "none",
        color: "rgba(255, 255, 255, 0.5)",
        lineHeight: "1.6",
        fontFamily: "'Fira Code', monospace",
      }}
    >
      {lines.map((_, idx) => (
        <p key={idx} style={{ margin: 0 }}>
          {idx + 1}
        </p>
      ))}
    </div>
  );
}
