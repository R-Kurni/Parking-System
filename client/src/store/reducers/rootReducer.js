import { combineReducers } from "redux";
import parkingReducer from "./parkingReducer";

const rootReducer = combineReducers({
	parkings: parkingReducer,
});

export default rootReducer;
