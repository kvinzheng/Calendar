import React, { useState, useEffect } from "react";
import { makeISOdateString } from "../../helpers/dateFormat";
import "./CalendarForm.css";
import { setEvents, setEditableEvent } from "../../actions/events";
import { setCalendarForm } from "../../actions/form";
import { randomColor } from "randomcolor";
import { connect } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

export const CalendarForm = ({
  editableEvent,
  displayedDate,
  setEvents,
  setCalendarForm,
  events,
}) => {
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(displayedDate);
  const [end, setEnd] = useState(displayedDate);
  useEffect(() => {
    if (editableEvent) {
      const { description, id, title, date, end } = editableEvent;
      setDescription(description);
      setId(id);
      setTitle(title);
      setDate(date);
      setEnd(end);
    }
  }, [editableEvent]);

  const inputValidation = () => {
    return title !== "" && !isNaN(Date.parse(date));
  };

  const handleEventsSet = (changed) => {
    let newEvents = [];
    if (changed.id === "") {
      changed.id += new Date();
      newEvents = [...events, changed];
    } else {
      newEvents = events.map((event) => {
        return event.id === changed.id ? { ...changed } : event;
      });
    }
    setEvents(newEvents);
    setCalendarForm(false);
  };

  const handleEventDelete = (id) => {
    const newEvents = events.filter((event) => event.id !== id);
    setCalendarForm(false);
    setEvents(newEvents);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const value = {
      id,
      title,
      description,
      date,
      end,
      color: randomColor(),
    };
    handleEventsSet(value);
  };

  const newEvent = id === "" ? true : false;

  return (
    <div className="CalendarForm">
      <div className="CalendarForm-content">
        <div className="CalendarForm-content-top">
          <AiOutlineClose
            className="CalendarForm-button CalendarForm-button-cancel"
            size={25}
            onClick={() => setCalendarForm(false)}
          />
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="edit-form--top">
            <input
              className="CalendarForm-input CalendarForm-input-required"
              placeholder="Event name.."
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <textarea
              className="CalendarForm-input"
              placeholder="Text Descriptions..."
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <div className="CalendarForm-input-datetime">
              <label className="CalendarForm-input-datetime-label">From</label>
              <input
                className="CalendarForm-input  CalendarForm-input-required CalendarForm-input-start"
                type="datetime-local"
                onInput={(e) => setDate(new Date(e.target.value))}
                value={makeISOdateString(date)}
              />
            </div>

            <div className="CalendarForm-input-datetime">
              <label className="CalendarForm-input-datetime-label">To</label>
              <input
                className="CalendarForm-input  CalendarForm-input-required CalendarForm-input-end"
                type="datetime-local"
                onInput={(e) => setEnd(new Date(e.target.value))}
                value={makeISOdateString(end)}
              />
            </div>
          </div>

          <div className="CalendarForm-bottom">
            {!newEvent && (
              <button
                className="CalendarForm-button CalendarForm-button-del"
                type="button"
                onClick={() => handleEventDelete(id)}
              >
                <span>Delete</span>
              </button>
            )}
            <button
              className="CalendarForm-button CalendarForm-button-add"
              type="submit"
              disabled={!inputValidation()}
            >
              <span>{newEvent ? "Create" : "Edit"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    events: state.events.data,
    editableEvent: state.events.editableEvent,
  };
};

export default connect(mapStateToProps, {
  setEvents,
  setCalendarForm,
  setEditableEvent,
})(CalendarForm);
