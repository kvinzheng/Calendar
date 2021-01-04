import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";

import { daysDifference } from "../../helpers/eventTimeline";
import CalendarCell from "../CalendarCell/CalendarCell";
import { setEvents } from "../../actions/events";
import {
  weekdays,
  getArrayOfDates,
  doMonthsMatch,
  istheSameDay,
  makeDateOfDateAndTime,
} from "../../helpers/dateFormat";

import "./CalendarContent.css";

export const CalendarContent = ({
  displayedDate,
  events,
  outlinedDate,
  eventPosition,
  zoomWidth,
  setEvents,
}) => {
  const handleEventDrag = (result) => {
    const { destination, source, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      const newEvents = events.map((event) => {
        const newStartDate = makeDateOfDateAndTime(
          destination.droppableId,
          event.date
        );
        const newEndDate = new Date(event.end.getTime());
        const diff = daysDifference(event.date, event.end);

        newEndDate.setDate(newStartDate.getDate() + diff);

        const newEvent = {
          ...event,
          date: newStartDate,
          end: newEndDate,
        };

        return event.id === draggableId ? newEvent : event;
      });
      setEvents(newEvents);
    }
  };

  const onDrag = (result) => {
    const { destination, source } = result;
    const inValid =
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index);

    if (inValid) return;
    handleEventDrag(result);
  };

  const getCellType = (date) => {
    if (istheSameDay(date, outlinedDate)) {
      return "CalendarContent-outlined";
    }

    if (!doMonthsMatch(date, displayedDate)) {
      return "CalendarContent-extra";
    }
    return "";
  };

  const dates = getArrayOfDates(displayedDate);
  const lastDate = dates[dates.length - 1];

  const monthlyWeekdays = [];
  for (let i = 0; i < 5; i++) {
    monthlyWeekdays.push(...weekdays);
  }

  return (
    <div className="CalendarContent">
      {monthlyWeekdays.map((weekday, index) => (
        <div className="CalendarContent-week" tabIndex={-1} key={index}>
          <div style={{ width: `${zoomWidth}px` }}> {weekday}</div>
        </div>
      ))}

      <DragDropContext  onDragEnd={onDrag}>
        {dates.map((date, index) => {
          return (
            <CalendarCell
              key={index}
              date={date}
              events={events}
              cellIndex={date.valueOf()}
              type={getCellType(date)}
              eventPosition={eventPosition}
              lastDate={lastDate}
            />
          );
        })}
      </DragDropContext>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    events: state.events.data,
    form: state.form.calendarForm,
    zoomWidth: state.events.zoom.width,
  };
};

CalendarContent.propTypes = {
  events: PropTypes.array,
  form: PropTypes.bool,
  zoomWidth: PropTypes.number,
};

export default connect(mapStateToProps, { setEvents })(CalendarContent);
