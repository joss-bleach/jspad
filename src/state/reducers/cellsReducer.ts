import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../interfaces/cell";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = (
  state: CellsState = initialState,
  action: Action
): CellsState => {
  switch (action.type) {
    case ActionType.CELL_UPDATE:
      return state;
    case ActionType.CELL_DELETE:
      return state;
    case ActionType.CELL_MOVE:
      return state;
    case ActionType.CELL_INSERT_BEFORE:
      return state;
    default:
      return state;
  }
};

export default reducer;
