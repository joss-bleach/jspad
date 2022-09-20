import "./action-bar.css";
import { useActions } from "../../hooks/useActions";
import ActionButton from "./ActionButton";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className="action-bar">
      <ActionButton icon="fa-arrow-up" onClick={() => moveCell(id, "up")} />
      <ActionButton icon="fa-arrow-down" onClick={() => moveCell(id, "down")} />
      <ActionButton icon="fa-times" onClick={() => deleteCell(id)} />
    </div>
  );
};

export default ActionBar;
