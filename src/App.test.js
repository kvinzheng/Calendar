import React from "react";
import thunk from "redux-thunk";

import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import configureStore from "redux-mock-store";

import App from "./App";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

configure({ adapter: new Adapter() });

describe("App", () => {
  it("App.js renders to the page", () => {
    const component = shallow(<App store={mockStore} />);
    expect(component).toMatchSnapshot();
  });
});
