import "bulmaswatch/cosmo/bulmaswatch.min.css";
import ReactDom from "react-dom";
import { useState } from "react";
import bundle from "./bundler";

// Components
import CodeEditor from "./components/code/CodeEditor/CodeEditor";
import CodePreview from "./components/code/Code Preview/CodePreview";

const App = () => {
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

ReactDom.render(<App />, document.querySelector("#root"));
