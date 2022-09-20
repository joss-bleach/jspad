import produce from "immer";
import { v4 as uuidv4 } from "uuid";
import { ActionType } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../interfaces";

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

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.CELL_UPDATE:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    case ActionType.CELL_DELETE:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      return state;
    case ActionType.CELL_MOVE:
      const { direction } = action.payload;
      const moveIndex = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === "up" ? moveIndex - 1 : moveIndex + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }
      state.order[moveIndex] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      return state;
    case ActionType.CELL_INSERT_BEFORE:
      const newCell: Cell = {
        id: uuidv4(),
        content: "",
        type: action.payload.type,
      };
      state.data[newCell.id] = newCell;
      const insertIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );
      if (insertIndex < 0) {
        state.order.push(newCell.id);
      } else {
        state.order.splice(insertIndex, 0, newCell.id);
      }
      return state;
    default:
      return state;
  }
}, initialState);

export default reducer;
