import { CellTypes } from "../../state";

interface AddCellButtonProps {
  icon: string;
  cellType: CellTypes;
  onClick: () => void;
}

const AddCellButton: React.FC<AddCellButtonProps> = ({
  icon,
  onClick,
  cellType,
}) => {
  return (
    <button onClick={onClick} className="button is-primary is-small">
      <span className="button-content">
        <span className="icon">
          <i className={`fas ${icon}`} />
        </span>
        Add {cellType} block
      </span>
    </button>
  );
};

export default AddCellButton;
