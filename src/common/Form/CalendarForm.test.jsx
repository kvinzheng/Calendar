import React from "react";
import thunk from "redux-thunk";

import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { CalendarForm } from "./CalendarForm.jsx";
import { mapStateToProps } from "./CalendarForm";
import MockData from "../../helpers/testingData";

configure({ adapter: new Adapter() });

describe("CalendarForm Component", () => {
  it("should render with props passed in", () => {
    const today = new Date();
    const component = shallow(
      <CalendarForm
        events={MockData.events.data}
        form={MockData.form.CalendarForm}
        displayedDate={today}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("mapStateToProps", () => {
    const state = {
      events: { data: MockData.events.data, editableEvent: null },
    };
    const expected = {
      events: MockData.events.data,
      editableEvent: null,
    };
    expect(mapStateToProps(state)).toEqual(expected);
  });
});
