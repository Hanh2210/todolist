import types from "../actions/types";

const initialState = {
  isLoading: null,
  dataCreate: null,
}
const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.START_GET_TASKS:
      return {
        ...state,
        isLoading: true,
          dataCreate: action.data
      }
    case types.GET_TASK_SUCCESS:
      return {
        ...state,
        isLoading: false,
          dataCreate: action.data
      }
    case types.GET_TASK_FAILURE:
      return {
        ...state,
        isLoading: false,
          dataCreate: action.data
      }
    default:
      return state;
  }
}

export default taskReducer;