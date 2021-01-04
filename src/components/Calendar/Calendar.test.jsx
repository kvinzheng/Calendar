import React from "react";
import thunk from "redux-thunk";

import configureMockStore from "redux-mock-store";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Calendar } from "./Calendar";
import { mapStateToProps } from "./Calendar";

import MockData from "../../helpers/testingData";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

configure({ adapter: new Adapter() });

describe("Calendar Component", () => {
  it("should render without any data defined", () => {
    const component = shallow(<Calendar />);

    expect(component).toMatchSnapshot();
  });

  it("should render with props passed in", () => {
    const component = shallow(
      <Calendar
        events={MockData.events.data}
        form={MockData.form.calendarForm}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("mapStateToProps", () => {
    const state = {
      events: { data: [] },
      form: { calendarForm: false },
    };
    const expected = {
      events: [],
      form: false,
    };
    expect(mapStateToProps(state)).toEqual(expected);
  });
});
