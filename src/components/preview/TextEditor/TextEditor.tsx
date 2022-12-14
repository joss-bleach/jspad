import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import "./text-editor.css";
import { Cell } from "../../../state";
import { useActions } from "../../../hooks/useActions";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [contentIsEditable, setContentIsEditable] = useState(false);
  const { updateCell } = useActions();

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
        <MDEditor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v || "")}
        />
      </div>
    );
  } else {
    return (
      <div
        onClick={() => setContentIsEditable(true)}
        className="text-editor card"
      >
        <div className="card-content">
          <MDEditor.Markdown source={cell.content || "Click to edit"} />
        </div>
      </div>
    );
  }
};

export default TextEditor;
