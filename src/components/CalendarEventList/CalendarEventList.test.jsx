import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureMockStore from "redux-mock-store";

import CalendarEventList from "./CalendarEventList";
import { mapStateToProps } from "./CalendarEventList";

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe("CalendarEventList", () => {
  it("should render without any data defined", () => {
    const component = shallow(
      <Provider store={store}>
        <CalendarEventList events={[]} form={false} />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });

  it("mapStateToProps", () => {
    const state = {
      events: { data: [], zoom: { width: 150 } },
      form: { calendarForm: false },
    };
    const expected = {
      events: [],
      form: false,
      zoomWidth: 150,
    };
    expect(mapStateToProps(state)).toEqual(expected);
  });
});
