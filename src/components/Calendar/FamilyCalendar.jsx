import { useState, useEffect, useContext } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ApiContext } from '../contexts/ApiContext';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'fr': require('date-fns/locale/fr') };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

export default function FamilyCalendar() {
  const { fetchData, updateData, CALENDAR_BIN } = useContext(ApiContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const data = await fetchData(CALENDAR_BIN);
    setEvents(data);
  };

  const handleSelect = async ({ start, end }) => {
    const title = window.prompt("Nouvel événement");
    if (title) {
      const newEvent = { title, start, end };
      await updateData(CALENDAR_BIN, [...events, newEvent]);
      loadEvents();
    }
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelect}
        selectable
      />
    </div>
  );
}
