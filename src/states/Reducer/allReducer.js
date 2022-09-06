import { combineReducers } from "redux";
import TodoReducer from "./TodoReducer";

const allReducer = combineReducers({
  Todo: TodoReducer,
});

export default allReducer;
