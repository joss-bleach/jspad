import { useState } from "react";
import bundle from "../../../bundler";

// Components
import CodeEditor from "../CodeEditor/CodeEditor";
import CodePreview from "../CodePreview/CodePreview";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        onChange={(value) => setInput(value)}
        initialValue="// Enter some code!"
      />
      <CodePreview code={code} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
    </div>
  );
};

export default CodeCell;
