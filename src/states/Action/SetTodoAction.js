import { SET_TODO } from "../ActionTypes/ActionTypes";

const SetTodoAction = (todo) => {
  return {
    type: SET_TODO,
    payload: todo,
  };
};

export default SetTodoAction;
