import React from "react";

import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { CalendarEvent } from "./CalendarEvent";

import MockData from "../../helpers/testingData";

import { render, screen, fireEvent } from "@testing-library/react";

configure({ adapter: new Adapter() });


describe("CalendarEvent", () => {
  it("should render with data defined", () => {
    const component = shallow(
      <CalendarEvent
        setCalendarForm={jest.fn()}
        setEditableEvent={jest.fn()}
        events={MockData.events.data}
        form={MockData.form.calendarForm}
        event={{ color: "yellow", id: 1, title: "drink water" }}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it("When you click on an event", () => {
    const setEditableEvent = jest.fn();
    const setCalendarForm = jest.fn();
    render(
      <CalendarEvent
        events={MockData.events.data}
        form={MockData.form.calendarForm}
        setEditableEvent={setEditableEvent}
        setCalendarForm={setCalendarForm}
        event={{ color: "yellow", id: 1, title: "drink water" }}
      />
    );
    fireEvent.click(screen.getAllByTestId("CalendarEvent-bar")[0]);

    expect(setEditableEvent).toHaveBeenCalled();
    expect(setCalendarForm).toHaveBeenCalled();
  });
});
