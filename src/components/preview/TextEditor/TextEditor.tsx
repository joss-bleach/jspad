import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [contentIsEditable, setContentIsEditable] = useState(false);
  const [value, setValue] = useState("# Header");

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setContentIsEditable(false);
    };
    document.addEventListener("click", listener, { capture: true });
    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (contentIsEditable) {
    return (
      <div ref={ref} className="text-editor">
        <MDEditor value={value} onChange={(v) => setValue(v || "")} />
      </div>
    );
  } else {
    return (
      <div
        onClick={() => setContentIsEditable(true)}
        className="text-editor card"
      >
        <div className="card-content">
          <MDEditor.Markdown source={value} />
        </div>
      </div>
    );
  }
};

export default TextEditor;
