import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CalendarEventList from "../CalendarEventList/CalendarEventList";
import "./CalendarCell.css";

const CalendarCell = ({
  date,
  cellIndex,
  type,
  color,
  eventPosition,
  lastDate,
  zoomWidth,
}) => {
  return (
    <div
      className={"CalendarCell " + type}
      style={{ width: `${zoomWidth}px` }}
    >
      <div className="CalendarCell-day">{date.getDate()}</div>
      <CalendarEventList
        date={date}
        color={color}
        cellIndex={cellIndex}
        eventPosition={eventPosition}
        lastDate={lastDate}
      />
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    zoomWidth: state.events.zoom.width,
  };
};

CalendarCell.propTypes = {
  date: PropTypes.object,
  cellIndex: PropTypes.number,
  type: PropTypes.string,
  color: PropTypes.string,
  eventPosition: PropTypes.array,
  lastDate: PropTypes.object,
  zoomWidth: PropTypes.number,
};

export default connect(mapStateToProps, {})(CalendarCell);
