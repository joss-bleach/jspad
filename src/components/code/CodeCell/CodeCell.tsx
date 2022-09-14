import { useState } from "react";
import bundle from "../../../bundler";

// Components
import CodeEditor from "../CodeEditor/CodeEditor";
import CodePreview from "../CodePreview/CodePreview";
import Resizable from "../../Resizable/Resizable";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            onChange={(value) => setInput(value)}
            initialValue="// Enter some code!"
          />
        </Resizable>
        <CodePreview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
