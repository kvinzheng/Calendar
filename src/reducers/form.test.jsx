import form from "./form";
import mockData from "../helpers/testingData";
import { SET_CALENDAR_FORM } from "../actions/type";

describe("form", () => {
  it("returns an the default state if passed in state that is undefined", () => {
    const nextState = form(undefined, {});
    expect(nextState).toEqual(mockData.form);
  });

  it("returns the exact state given an unkown type (i.e., does not modify the state)", () => {
    const prevState = {
      calendarForm: false,
    };

    const nextState = form(prevState, { type: "UNKNOWN" });
    expect(nextState).toBe(prevState);
  });

  it("return a new state with the specified selected event set on it", () => {
    const prevState = {
      calendarForm: false,
    };
    const nextState = form(prevState, {
      type: SET_CALENDAR_FORM,
      payload: true,
    });

    expect(nextState).not.toBe(prevState);
    expect(nextState).toEqual({
      calendarForm: true,
    });
  });
});
