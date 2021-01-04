import React from "react";
import { getNextMonth, formatMonthYear } from "../../helpers/dateFormat.js";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { connect } from "react-redux";
import {
  setEvents,
  setZoomWidth,
  setEditableEvent,
} from "../../actions/events";
import { setCalendarForm } from "../../actions/form";
import PropTypes from "prop-types";

import "./CalendarHeader.css";

export const CalendarHeader = ({
  displayedDate,
  onMonthShift,
  zoomWidth,
  setCalendarForm,
  setZoomWidth,
  setEditableEvent,
}) => {
  const handleFormCreate = () => {
    setEditableEvent(null);
    setCalendarForm(true);
  };
  const handleZoomIn = () => {
    setZoomWidth(zoomWidth + 10);
  };
  const handleZoomOut = () => {
    if (zoomWidth > 90) {
      setZoomWidth(zoomWidth - 10);
    } else {
      alert("Zoom reach minimum");
    }
  };
  const handleZoomReset = () => {
    setZoomWidth(150);
  };
  return (
    <div className="CalendarHeader">
      <div className="CalendarHeader-navigation">
        <button
          title={"today"}
          className="CalendarHeader-button CalendarHeader-today"
          type="button"
          data-testid="CalendarHeader-today"
          onClick={() => onMonthShift(new Date())}
        >
          <span aria-hidden="true">Today</span>
        </button>
        <button
          title={"previous month"}
          className="CalendarHeader-button"
          type="button"
          onClick={() => onMonthShift(getNextMonth(displayedDate, -1))}
        >
          <span aria-hidden="true">{"<"}</span>
        </button>

        <button
          className="CalendarHeader-button"
          type="button"
          title={"next month"}
          onClick={() => onMonthShift(getNextMonth(displayedDate, +1))}
        >
          <span aria-hidden="true">{">"}</span>
        </button>
        <div className="CalendarHeader-title" data-testid="CalendarHeader-date">
          {formatMonthYear(displayedDate)}
        </div>
      </div>

      <div className="CalendarHeader-right-portion">
        <AiOutlineZoomIn
          disabled={zoomWidth < 90}
          onClick={handleZoomIn}
          className="CalendarHeader-zoom"
          data-testid="CalendarHeader-zoom-in"
          size={30}
          title="zoom in"
        />

        <AiOutlineZoomOut
          onClick={handleZoomOut}
          className="CalendarHeader-zoom"
          data-testid="CalendarHeader-zoom-out"
          size={30}
          title="zoom out"
        />

        <button
          tabIndex={-1}
          className="CalendarHeader-button"
          data-testid="CalendarHeader-zoom-reset"
          onClick={handleZoomReset}
        >
          <span>onZoomReset</span>
        </button>

        <button
          className="CalendarHeader-button CalendarHeader-button-add"
          data-testid="CalendarHeader-form-create"
          type="button"
          onClick={handleFormCreate}
        >
          <FaPlus size={20} className="CalendarHeader-create-icon" />
          <span> Create</span>
        </button>
      </div>
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    form: state.form.calendarForm,
    zoomWidth: state.events.zoom.width,
  };
};

CalendarHeader.propTypes = {
  form: PropTypes.bool,
  zoomWidth: PropTypes.number,
};

export default connect(mapStateToProps, {
  setEvents,
  setCalendarForm,
  setZoomWidth,
  setEditableEvent,
})(CalendarHeader);
