import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CalendarEvent from "../CalendarEvent/CalendarEvent";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { setEvents } from "../../actions/events";

import { istheSameDay } from "../../helpers/dateFormat.js";
import { daysDifference } from "../../helpers/eventTimeline";

import "./CalendarEventList.css";

const CalendarEventList = ({
  zoomWidth,
  date,
  events,
  cellIndex,
  eventPosition,
  lastDate,
}) => {
  const filteredEvents = events.filter((event) =>
    istheSameDay(event.date, date)
  );
  const sortedEvents = filteredEvents.sort((a, b) => {
    return a.date - b.date;
  });

  return (
    <Droppable droppableId={cellIndex} classsName="CalendarEventList">
      {(provided) => (
        <div
          className="CalendarEventList-content"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {sortedEvents.map((item, index) => {
            const endDate =
              item.end.getTime() > lastDate.getTime() ? lastDate : item.end;
            const diff = daysDifference(item.date, endDate);

            let rowIndex = 0;
            for (let i = 0; i < eventPosition.length; i++) {
              const stack = eventPosition[i];
              for (let ele of stack) {
                if (ele[0] === item.id) {
                  rowIndex = i;
                }
              }
            }

            const rowHeight = "45";
            return (
              <div
                style={{
                  width: `${zoomWidth * (diff + 1)}px `,
                  position: "absolute",
                  top: `${(rowIndex + 1) * rowHeight + 60}px`,
                }}
                key={index}
              >
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <CalendarEvent event={item} />
                    </div>
                  )}
                </Draggable>
              </div>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export const mapStateToProps = (state) => {
  return {
    events: state.events.data,
    form: state.form.calendarForm,
    zoomWidth: state.events.zoom.width,
  };
};

CalendarEventList.propTypes = {
  events: PropTypes.array,
  form: PropTypes.bool,
  zoomWidth: PropTypes.number,
};

export default connect(mapStateToProps, { setEvents })(CalendarEventList);
