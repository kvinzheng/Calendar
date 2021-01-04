import React from "react";

import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { CalendarContent } from "./CalendarContent";
import MockData from "../../helpers/testingData";

configure({ adapter: new Adapter() });

describe("CalendarContent", () => {
  it("should render without any data defined", () => {
    const component = shallow(<CalendarContent />);

    expect(component).toMatchSnapshot();
  });

  it("should render with data defined", () => {
    const component = shallow(
      <CalendarContent
        events={MockData.events.data}
        form={MockData.form.calendarForm}
        zoomWidth={MockData.events.zoom.width}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
