export const dayMilliseconds = 24 * 60 * 60 * 1000;

export const weekdays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* get the first day of the month */
export const getFirstDay = (date) => {
  const _date = new Date(date);
  return new Date(_date.getFullYear(), _date.getMonth(), 1);
};

/* get the last day of the month */
export const getLastDay = (date) => {
  const _date = new Date(date);
  return new Date(_date.getFullYear(), _date.getMonth() + 1, 0);
};

/* get the first day of the grid month */
export const getFirstGridDay = (date) => {
  const _date = new Date(date);
  let weekday = _date.getDay();
  return new Date(_date.setDate(_date.getDate() - (weekday || 7)));
};

/* get the last day of the grid month */
export const getLastGridDay = (date) => {
  const _date = new Date(date);
  let weekday = _date.getDay();
  return new Date(_date.setDate(_date.getDate() + (7 - (weekday || 7) - 1)));
};

/* count day duration */
export const getDaysCount = (date1, date2) => {
  return date2 > date1
    ? Math.ceil((date2 - date1) / dayMilliseconds) + 1
    : null;
};

/* veriffy iff they are the same day */
export const istheSameDay = (date1, date2) => {
  const _date1 = new Date(date1.toDateString());
  const _date2 = new Date(date2.toDateString());
  return Math.abs(_date1 - _date2) < dayMilliseconds;
};

/*verify month match */
export const doMonthsMatch = (date1, date2) => {
  return date1.getMonth() === date2.getMonth();
};

/* get next day */
export const getNextDay = (date, i) => {
  const _date = new Date(date);
  return new Date(_date.setDate(_date.getDate() + i));
};

/* get next month */
export const getNextMonth = (date, i) => {
  const _date = new Date(date);
  return new Date(_date.setMonth(_date.getMonth() + i));
};

/* get time format */
export const formatTime = (date) => {
  let hour = date.getHours();
  if (hour < 10) hour = "0" + hour;

  let minutee = date.getMinutes();
  if (minutee < 10) minutee = "0" + minutee;
  return `${hour}:${minutee}`;
};

/* get date format */
export const formatDate = (date) => {
  let day = date.getDate();
  if (day < 10) day = `0${day}`;

  let month = date.getMonth() + 1;
  if (month < 10) month = `0${month}`;

  let year = date.getFullYear() % 100;
  if (year < 10) year = `0${year}`;

  return `${day}.${month}.${year}`;
};

/* get month and year format */
export const formatMonthYear = (date) => {
  const _date = new Date(date);
  return months[_date.getMonth()] + " " + _date.getFullYear();
};

/* get date object value from a day and time */
export const makeDateOfDateAndTime = (date, time) => {
  const _date = new Date(date);
  const _time = new Date(time);

  return new Date(_date.setHours(_time.getHours(), _time.getMinutes()));
};

/* get an whole array of day in a month */
export const getArrayOfDates = (date) => {
  const firstDay = getFirstDay(date);
  const lastDay = getLastDay(date);

  const firstGridDay = getFirstGridDay(firstDay);
  const lastGridDay = getLastGridDay(lastDay);

  const daysCount = getDaysCount(firstGridDay, lastGridDay);

  const dates = [];
  for (let i = 0; i < daysCount; i++) {
    dates.push(getNextDay(firstGridDay, i));
  }

  return dates;
};

/*   Format => "2011-01-26T13:51"  */
export const makeISOdateString = (date) => {
  let day = date.getDate();
  if (day < 10) day = "0" + day;

  let month = date.getMonth() + 1;
  if (month < 10) month = "0" + month;

  let year = date.getFullYear();
  if (year < 10) year = "0" + year;

  let hour = date.getHours();
  if (hour < 10) hour = "0" + hour;

  let minute = date.getMinutes();
  if (minute < 10) minute = "0" + minute;

  return year + "-" + month + "-" + day + "T" + hour + ":" + minute;
};