import { ActionType } from "../action-types";
import { CellTypes } from "../interfaces/cell";

export type Direction = "up" | "down";

export interface MoveCellAction {
  type: ActionType.CELL_MOVE;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: ActionType.CELL_DELETE;
  payload: string;
}

export interface InsertCellAfterAction {
  type: ActionType.CELL_INSERT_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

export interface UpdateCellAction {
  type: ActionType.CELL_UPDATE;
  payload: {
    id: string;
    content: string;
  };
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction;
