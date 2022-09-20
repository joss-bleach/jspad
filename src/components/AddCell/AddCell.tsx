import "./add-cell.css";
import { useActions } from "../../hooks/useActions";

// Components
import AddCellButton from "./AddCellButton";

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId, forceVisible }) => {
  const { insertCellAfter } = useActions();
  return (
    <div className={`add-cell ${forceVisible ? `force-visible` : ""}`}>
      <AddCellButton
        onClick={() => insertCellAfter(previousCellId, "code")}
        cellType="code"
        icon="fa-code"
      />
      <AddCellButton
        onClick={() => insertCellAfter(previousCellId, "text")}
        cellType="text"
        icon="fa-font"
      />
    </div>
  );
};

export default AddCell;
