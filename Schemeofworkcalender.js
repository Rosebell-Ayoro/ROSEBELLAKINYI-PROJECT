import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { format, parse } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = {
  format,
  parse,
  startOfWeek: () => new Date(),
  getDay: date => date.getDay(),
  locales: { 'en-US': enUS },
};

const SchemeOfWorkCalendar = () => {
  const [events, setEvents] = useState([
    {
      title: 'Biology - Classification of Animals',
      start: new Date(2025, 6, 1, 8, 0),
      end: new Date(2025, 6, 1, 9, 0),
    },
    {
      title: 'Math - Introduction to Algebra',
      start: new Date(2025, 6, 2, 10, 0),
      end: new Date(2025, 6, 2, 11, 0),
    },
  ]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Lesson Schedule (Calendar View)</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};
export default SchemeOfWorkCalendar;