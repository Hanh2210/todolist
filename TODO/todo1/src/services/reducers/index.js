import {combineReducers} from "redux";
import taskReducer from "./task";

const indexReducer = combineReducers({
  taskReducer
});

export default indexReducer;