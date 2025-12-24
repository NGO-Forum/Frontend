import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  /* ================= SCREEN SIZE ================= */
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ================= FETCH EVENTS ================= */
  useEffect(() => {
    fetch(
      `https://membership.ngoforum.site/api/calendar?month=${month + 1}&year=${year}`
    )
      .then(res => res.json())
      .then(data => setEvents(data.events || []))
      .catch(console.error);
  }, [month, year]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow overflow-hidden max-w-full">

        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
            <ChevronLeft />
          </button>

          <h2 className="font-bold text-xl text-green-600">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>

          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
            <ChevronRight />
          </button>
        </div>

        {/* MOBILE LIST VIEW */}
        {isMobile ? (
          <div className="p-4 space-y-3">
            {events.length === 0 && (
              <p className="text-gray-500 text-sm">No events</p>
            )}

            {events.map(event => (
              <div
                key={event.id}
                className="border rounded-lg p-3"
              >
                <div className="font-semibold">{event.title}</div>
                <div className="text-sm text-gray-600">
                  {event.start_date} – {event.end_date}
                </div>
                {event.location && (
                  <div className="text-xs text-gray-500">
                    📍 {event.location}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* DESKTOP MONTH GRID */
          <MonthGrid currentDate={currentDate} events={events} />
        )}
      </div>
    </div>
  );
}

/* ================= MONTH GRID ================= */
function MonthGrid({ currentDate, events }) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const startOfMonth = new Date(year, month, 1);
  const gridStart = new Date(startOfMonth);
  gridStart.setDate(startOfMonth.getDate() - startOfMonth.getDay());

  const today = new Date();

  /* Always build 42 cells */
  const days = Array.from({ length: 35 }, (_, i) => {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    return d;
  });

  const getEventsForDate = date =>
    events.filter(event => {
      const start = new Date(event.start_date);
      const end = new Date(event.end_date);
      return date >= start && date <= end;
    });

  return (
    <>
      {/* WEEK HEADER */}
      <div className="grid grid-cols-7 bg-green-600 text-white text-center font-semibold">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d} className="py-3">{d}</div>
        ))}
      </div>

      {/* CALENDAR GRID */}
      <div className="grid grid-cols-7 grid-rows-5">
        {days.map((date, i) => {
          const isCurrentMonth = date.getMonth() === month;
          const isToday =
            date.toDateString() === today.toDateString();

          const dayEvents = getEventsForDate(date);

          return (
            <div
              key={i}
              className={`border p-2 h-32 relative
                ${isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400"}
              `}
            >
              {/* DAY NUMBER */}
              <span className="text-sm font-semibold">
                {isToday ? (
                  <span className="bg-blue-600 text-white rounded-full px-2 py-1 text-xs">
                    {date.getDate()}
                  </span>
                ) : (
                  date.getDate()
                )}
              </span>

              {/* EVENTS */}
              <div className="mt-2 space-y-1">
                {dayEvents.slice(0, 2).map(event => (
                  <div
                    key={event.id}
                    className="text-xs bg-green-600 text-white rounded px-1 truncate"
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-500">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
