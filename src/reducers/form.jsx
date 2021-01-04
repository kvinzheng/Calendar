import { SET_CALENDAR_FORM } from "../actions/type";
import { form } from "./state";

const formState = (state = form, action) => {
  switch (action.type) {
    case SET_CALENDAR_FORM: {
      return {
        ...state,
        calendarForm: action.payload,
      };
    }

    default:
      return state;
  }
};
export default formState;