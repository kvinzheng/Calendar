import { setCalendarForm } from "./form";
import { SET_CALENDAR_FORM } from "./type";
import mockData from "../helpers/testingData";

describe("setCalendar form Tests", () => {
  it("SUCCESS: setCalendar form test", () => {
    const actual = {
      type: SET_CALENDAR_FORM,
      payload: mockData.form,
    };
    const expected = setCalendarForm(mockData.form);

    expect(actual).toEqual(expected);
  });
});
