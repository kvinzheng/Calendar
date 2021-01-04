import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CalendarContent from "../CalendarContent/CalendarContent";
import CalendarHeader from "../CalendarHeader/CalendarHeader";
import CalendarForm from "../../common/Form/CalendarForm";

import { setEvents } from "../../actions/events";
import { calculatePosition } from "../../helpers/eventTimeline";

import "./Calendar.css";

export const Calendar = ({ events, form }) => {
  const [displayedDate, setDisplayedDate] = useState(new Date("2018/01/01"));
  const [eventPosition, setEventPosition] = useState([]);

  const calendarRef = useRef();

  useEffect(() => {
    const position = [];
    events.forEach((item) => {
      calculatePosition([item.id, item.date, item.end], position);
      setEventPosition(position);
    });
  }, [events]);

  const handleMonthShift = (date) => {
    setDisplayedDate(date);
  };

  return (
    <div className="Calendar" data-testid="Calendar" ref={calendarRef}>
      {form && (
        <CalendarForm
          data-testid="CalendarForm"
          displayedDate={displayedDate}
        />
      )}
      <CalendarHeader
        data-testid="CalendarHeader"
        displayedDate={displayedDate}
        onMonthShift={handleMonthShift}
      />
      <CalendarContent
        data-testid="CalendarContent"
        displayedDate={displayedDate}
        outlinedDate={new Date()}
        eventPosition={eventPosition}
      />
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    events: state.events.data,
    form: state.form.calendarForm,
  };
};

Calendar.propTypes = {
  events: PropTypes.array,
  form: PropTypes.bool,
};

export default connect(mapStateToProps, { setEvents })(Calendar);
