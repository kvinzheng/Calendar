import { SET_CALENDAR_FORM } from "./type";

export const setCalendarForm = (status) => {
  return {
    type: SET_CALENDAR_FORM,
    payload: status,
  };
};
