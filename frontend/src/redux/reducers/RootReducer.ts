import {combineReducers} from "redux";
import knownsReducer from "./KnownsReducer";
import searchReducer from "./SearchReducer";

const RootReducer = combineReducers({
  knowns: knownsReducer,
  scans: searchReducer
});

export default RootReducer;