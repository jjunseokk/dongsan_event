import { combineReducers } from "redux";
import getDataReducer from "./getDataReducers";

export default combineReducers({
    data : getDataReducer,
});