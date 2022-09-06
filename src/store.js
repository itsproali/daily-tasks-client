import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import allReducer from "./states/Reducer/allReducer";

const store = createStore(allReducer, applyMiddleware(thunk));

export default store;
