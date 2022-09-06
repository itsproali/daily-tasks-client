import { SET_TODO } from "../ActionTypes/ActionTypes";

const initialTodo = {
  todo: null,
};

const TodoReducer = (state = initialTodo, action) => {
  switch (action.type) {
    case SET_TODO:
      return {
        todo: action.payload,
      };

    default:
      return state;
  }
};

export default TodoReducer;
