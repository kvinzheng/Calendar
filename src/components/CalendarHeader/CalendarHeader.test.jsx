import React from "react";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import Adapter from "enzyme-adapter-react-16";
import configureMockStore from "redux-mock-store";

import { shallow, configure } from "enzyme";
import { render, screen, fireEvent } from "@testing-library/react";

import { CalendarHeader } from "./CalendarHeader";
import { mapStateToProps } from "./CalendarHeader";
import MockData from "../../helpers/testingData";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  events: { data: [], zoom: { width: 150 } },
  form: { calendarForm: false },
});

configure({ adapter: new Adapter() });

describe("CalendarHeader component", () => {
  it("should render without any data defined", () => {
    const component = shallow(<CalendarHeader events={[]} form={false} />);

    expect(component).toMatchSnapshot();
  });

  it("should render with props passed in", () => {
    const component = shallow(
      <CalendarHeader
        zoomWidth={150}
        form={false}
        displayedDate={new Date()}
        onMonthShift={jest.fn()}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("mapStateToProps", () => {
    const state = {
      events: { data: [], zoom: { width: 150 } },
      form: { calendarForm: false },
    };
    const expected = {
      zoomWidth: 150,
      form: false,
    };
    expect(mapStateToProps(state)).toEqual(expected);
  });

  it("When you click on multiple buttons on the header", () => {
    const setEditableEvent = jest.fn();
    const setCalendarForm = jest.fn();
    const setZoomWidth = jest.fn();
    const onMonthShift = jest.fn();

    render(
      <CalendarHeader
        setEditableEvent={setEditableEvent}
        zoomWidth={MockData.events.zoom.width}
        setEditableEvent={setEditableEvent}
        setCalendarForm={setCalendarForm}
        setZoomWidth={setZoomWidth}
        onMonthShift={onMonthShift}
      />
    );
    fireEvent.click(screen.getAllByTestId("CalendarHeader-zoom-in")[0]);
    fireEvent.click(screen.getAllByTestId("CalendarHeader-zoom-out")[0]);
    fireEvent.click(screen.getAllByTestId("CalendarHeader-zoom-reset")[0]);
    fireEvent.click(screen.getAllByTestId("CalendarHeader-form-create")[0]);
    expect(setEditableEvent).toHaveBeenCalled();
    expect(setCalendarForm).toHaveBeenCalled();
    expect(setZoomWidth).toHaveBeenCalled();
  });
});
