import "bulmaswatch/solar/bulmaswatch.min.css";
import ReactDom from "react-dom";

// Components
import CodeCell from "./components/code/CodeCell/CodeCell";
import TextEditor from "./components/preview/TextEditor/TextEditor";

const App = () => {
  return (
    <div>
      <TextEditor />
    </div>
  );
};

ReactDom.render(<App />, document.querySelector("#root"));
