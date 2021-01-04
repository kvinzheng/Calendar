import {
  SET_EVENTS,
  SET_EDITABLE_EVENT,
  SET_ZOOM_WIDTH,
} from "../actions/type";

import { events } from "./state";

const eventState = (state = events, action) => {
  switch (action.type) {
    case SET_EVENTS: {
      return {
        ...state,
        data: action.payload,
      };
    }

    case SET_EDITABLE_EVENT: {
      return {
        ...state,
        editableEvent: action.payload,
      };
    }

    case SET_ZOOM_WIDTH: {
      return {
        ...state,
        zoom: { width: action.payload },
      };
    }
    default:
      return state;
  }
};
export default eventState;