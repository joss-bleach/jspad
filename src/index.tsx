import "bulmaswatch/cosmo/bulmaswatch.min.css";
import ReactDom from "react-dom";

// Components
import CodeCell from "./components/code/CodeCell/CodeCell";

const App = () => {
  return (
    <div>
      <CodeCell />
    </div>
  );
};

ReactDom.render(<App />, document.querySelector("#root"));
