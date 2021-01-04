import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureMockStore from "redux-mock-store";

import CalendarCell from "./CalendarCell";

configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe("CalendarCell", () => {
  it("should render without any data defined", () => {
    const component = shallow(
      <Provider store={store}>
        <CalendarCell zoomWidth={150} />
      </Provider>
    );

    expect(component).toMatchSnapshot();
  });
  
});
