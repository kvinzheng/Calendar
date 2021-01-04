import { SET_EVENTS, SET_EDITABLE_EVENT, SET_ZOOM_WIDTH } from "./type";

export const setEvents = (events) => {
  return {
    type: SET_EVENTS,
    payload: events,
  };
};

export const setEditableEvent = (event) => {
  return {
    type: SET_EDITABLE_EVENT,
    payload: event,
  };
};

export const setZoomWidth = (width) => {
  return {
    type: SET_ZOOM_WIDTH,
    payload: width,
  };
};
