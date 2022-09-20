import { ActionType } from "../action-types";
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
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

export const insertCellAfter = (
  id: string | null,
  cellType: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.CELL_INSERT_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};
