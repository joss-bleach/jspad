import { ActionType } from "../action-types";
import { CellTypes } from "../interfaces/cell";

interface MoveCellAction {
  type: ActionType.CELL_MOVE;
  payload: {
    id: string;
    direction: "up" | "down";
  };
}

interface DeleteCellAction {
  type: ActionType.CELL_DELETE;
  payload: string;
}

interface InsertCellBeforeAction {
  type: ActionType.CELL_INSERT_BEFORE;
  payload: {
    id: string;
    type: CellTypes;
  };
}

interface UpdateCellAction {
  type: ActionType.CELL_UPDATE;
  payload: {
    id: string;
    content: string;
  };
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellBeforeAction
  | UpdateCellAction;
