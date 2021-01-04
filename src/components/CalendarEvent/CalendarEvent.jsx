import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { setEvents, setEditableEvent } from "../../actions/events";
import { setCalendarForm } from "../../actions/form";

import "./CalendarEvent.css";

export const CalendarEvent = ({
  events,
  event,
  setEditableEvent,
  setCalendarForm,
}) => {

  const handleFormLoad = () => {
    const target = events.find((item) => item.id === event.id);

    if (target) {
      setCalendarForm(true);
      setEditableEvent({ ...target });
    }
  };
  return (
    <div
      className="CalendarEvent"
      data-testid="CalendarEvent-bar"
      onClick={handleFormLoad}
      style={{ backgroundColor: event.color }}
    >
      <span className="CalendarEvent-span">Title: {event.title}</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    events: state.events.data,
    form: state.form.calendarForm,
  };
};

CalendarEvent.propTypes = {
  events: PropTypes.array,
  form: PropTypes.bool,
};

export default connect(mapStateToProps, {
  setEvents,
  setEditableEvent,
  setCalendarForm,
})(CalendarEvent);
