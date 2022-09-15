import { ActionType } from "../action-types";
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellBeforeAction,
  Direction,
} from "../actions";
import { CellTypes } from "../interfaces/cell";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.CELL_UPDATE,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.CELL_DELETE,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.CELL_MOVE,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellBefore = (
  id: string,
  cellType: CellTypes
): InsertCellBeforeAction => {
  return {
    type: ActionType.CELL_INSERT_BEFORE,
    payload: {
      id,
      type: cellType,
    },
  };
};
