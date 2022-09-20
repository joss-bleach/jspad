import { useState, useEffect } from "react";
import bundle from "../../../bundler";
import { Cell } from "../../../state";
import { useActions } from "../../../hooks/useActions";

// Components
import CodeEditor from "../CodeEditor/CodeEditor";
import CodePreview from "../CodePreview/CodePreview";
import Resizable from "../../Resizable/Resizable";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setError(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(value) => updateCell(cell.id, value)}
            initialValue={cell.content}
          />
        </Resizable>
        <CodePreview code={code} bundleStatus={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
