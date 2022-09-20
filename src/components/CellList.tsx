import { useTypedSelector } from "../hooks/useTypedSelector";
import CellListItem from "./CellListItem";

const CellList: React.FC = () => {
  //@ts-ignore
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    //@ts-ignore
    order.map((id) => data[id])
  );

  //@ts-ignore
  const renderedCells = cells.map((cell) => (
    <CellListItem key={cell.id} cell={cell} />
  ));

  return <div>{renderedCells}</div>;
};

export default CellList;
