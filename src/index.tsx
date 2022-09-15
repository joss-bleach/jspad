import "bulmaswatch/solar/bulmaswatch.min.css";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { store } from "./state";

// Components
import CodeCell from "./components/code/CodeCell/CodeCell";
import TextEditor from "./components/preview/TextEditor/TextEditor";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <TextEditor />
      </div>
    </Provider>
  );
};

ReactDom.render(<App />, document.querySelector("#root"));
