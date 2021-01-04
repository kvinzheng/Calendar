import { setEvents, setEditableEvent, setZoomWidth } from "./events";
import { SET_EVENTS, SET_EDITABLE_EVENT, SET_ZOOM_WIDTH } from "./type";
import mockData from "../helpers/testingData";

describe("setEvents Tests", () => {
  it("SUCCESS: setEvents test", () => {
    const actual = {
      type: SET_EVENTS,
      payload: mockData.events.data,
    };
    const expected = setEvents(mockData.events.data);

    expect(actual).toEqual(expected);
  });

  it("SUCCESS: setEditableEvent", () => {
    const actual = {
      type: SET_EDITABLE_EVENT,
      payload: mockData.events.editableEvent,
    };
    const expected = setEditableEvent(mockData.events.editableEvent);
    expect(actual).toEqual(expected);
  });

  it("SUCCESS: setZoomWidth", () => {
    const actual = {
      type: SET_ZOOM_WIDTH,
      payload: mockData.events.zoom.width,
    };
    const expected = setZoomWidth(mockData.events.zoom.width);
    expect(actual).toEqual(expected);
  });
});
