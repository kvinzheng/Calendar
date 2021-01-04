import { generateCleanDate } from "../helpers/eventTimeline";

import testData from "../timelineItems";

export const events = {
  data: generateCleanDate(testData),
  editableEvent: null,
  zoom: { width: 150 },
};

export const form = { calendarForm: false };
