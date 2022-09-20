import { Fragment } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";

// Components
import CellListItem from "./CellListItem/CellListItem";
import AddCell from "./AddCell/AddCell";

const CellList: React.FC = () => {
  //@ts-ignore
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    //@ts-ignore
    order.map((id) => data[id])
  );

  //@ts-ignore
  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div>
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
