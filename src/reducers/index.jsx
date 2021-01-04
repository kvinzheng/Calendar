import { combineReducers } from "redux";
import events from "./events";
import form from "./form";


export default combineReducers({
  events,
  form
});
