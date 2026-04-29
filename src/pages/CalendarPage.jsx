import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock,
  MapPin,
  User,
  FileText,
  Paperclip,
  Phone,
  Mail,
  X,
} from "lucide-react";
import Swal from "sweetalert2";


/* ================= HELPERS ================= */
const normalize = d =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

const overlaps = (a, b) =>
  new Date(a.start_date) <= new Date(b.end_date) &&
  new Date(b.start_date) <= new Date(a.end_date);

/* ================= PAGE ================= */
export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    fetch(
      `https://membership.ngoforum.org.kh/api/calendar?month=${month + 1}&year=${year}`
      // `http://127.0.0.1:8000/api/calendar?month=${month + 1}&year=${year}`
    )
      .then(res => res.json())
      .then(data => setEvents(data.events || []))
      .catch(console.error);
  }, [month, year]);

  return (
    <div className="bg-gray-100 p-3 sm:p-4">
      <div className="bg-white rounded-xl shadow overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>
            <ChevronLeft />
          </button>

          <h2 className="font-bold text-lg sm:text-2xl text-green-700">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>

          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>
            <ChevronRight />
          </button>
        </div>

        <MonthGrid
          currentDate={currentDate}
          events={events}
          onEventClick={setSelectedEvent}
        />
      </div>

      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

/* ================= MONTH GRID ================= */
function MonthGrid({ currentDate, events, onEventClick }) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const startOfMonth = new Date(year, month, 1);
  const gridStart = new Date(startOfMonth);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());

  const days = Array.from({ length: 35 }, (_, i) => {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    return d;
  });

  const weeks = [];
  for (let i = 0; i < 5; i++) {
    weeks.push(days.slice(i * 7, i * 7 + 7));
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[700px]">
        <div className="grid grid-cols-7 bg-green-600 text-white text-center font-semibold">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
            <div key={d} className="py-3">{d}</div>
          ))}
        </div>

        {weeks.map((week, i) => (
          <WeekRow
            key={i}
            week={week}
            month={month}
            events={events}
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
}

/* ================= WEEK ROW ================= */
function WeekRow({ week, month, events, onEventClick }) {
  const weekEvents = events.filter(e => {
    const s = normalize(new Date(e.start_date));
    const en = normalize(new Date(e.end_date));
    return en >= week[0] && s <= week[6];
  });

  const lanes = [];
  weekEvents.forEach(event => {
    let placed = false;
    for (const lane of lanes) {
      if (!lane.some(e => overlaps(e, event))) {
        lane.push(event);
        placed = true;
        break;
      }
    }
    if (!placed) lanes.push([event]);
  });

  return (
    <div className="border-b relative">
      <div className="grid grid-cols-7 h-24 md:h-36">
        {week.map((day, i) => {
          const isToday =
            day.toDateString() === new Date().toDateString();

          return (
            <div
              key={i}
              className={`border-r p-2 text-sm relative
              ${day.getMonth() !== month ? "bg-gray-50 text-gray-400" : ""}
              ${isToday ? "bg-blue-50" : ""}
            `}
            >
              <span
                className={`inline-flex items-center justify-center
                w-7 h-7 text-sm font-semibold
                ${isToday ? "bg-blue-600 text-white rounded-full ring-2 ring-gray-300" : ""}
              `}
              >
                {day.getDate()}
              </span>
            </div>
          );
        })}

      </div>

      <div className="absolute inset-x-0 top-7 px-1">
        {lanes.map((lane, laneIndex) =>
          lane.map(event => (
            <EventBar
              key={event.id + laneIndex}
              event={event}
              week={week}
              laneIndex={laneIndex}
              onClick={onEventClick}
            />
          ))
        )}
      </div>
    </div>
  );
}

/* ================= EVENT BAR ================= */
function EventBar({ event, week, laneIndex, onClick }) {
  const s = normalize(new Date(event.start_date));
  const e = normalize(new Date(event.end_date));

  let start = week.findIndex(d => d >= s);
  let end = week.findIndex(d => d > e) - 1;

  if (start === -1) start = 0;
  if (end === -2) end = 6;

  const span = end - start + 1;
  const isMobile = window.innerWidth < 640;

  return (
    <div
      onClick={() => onClick(event)}
      className="absolute bg-green-400 border-l-8 border-green-600 text-white hover:bg-green-500 text-[6px] mt-3 md:text-xs rounded-md md:rounded-lg px-2 py-1 shadow cursor-pointer"
      style={{
        top: laneIndex * (isMobile ? 22 : 30),
        left: `${(start * 100) / 7}%`,
        width: `${(span * 100) / 7}%`,
      }}
    >
      <span className="block truncate">
        {event.start_time?.slice(0, 5)} {event.title}
      </span>
    </div>
  );
}

/* ================= Image ================= */
function EventFiles({ files }) {
  if (!files || files.length === 0) return null;

  return (
    <div className="mt-4 space-y-2">
      {files.map((file, index) => (
        <a
          key={index}
          href={file.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-xl border border-green-200 text-gray-800 bg-green-100 px-4 py-1.5 hover:bg-green-50 transition hover:text-blue-600"
        >
          <div className="min-w-0">
            <p className="truncate font-medium ">
              {file.file_name}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}


/* ================= EVENT DETAIL MODAL ================= */
function EventDetailModal({ event, onClose }) {

  const [message, setMessage] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [showMessageForm, setShowMessageForm] = useState(false);

  const sendMessage = async () => {
    if (!senderName || !senderEmail || !message) {
      Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill name, email, and message.",
        confirmButtonColor: "#16a34a",
      });
      return;
    }


    setSending(true);

    try {
      const res = await fetch("https://membership.ngoforum.org.kh/api/events/send-email",
      // const res = await fetch("http://127.0.0.1:8000/api/events/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            event_id: event.id,
            name: senderName,
            email: senderEmail,
            message,
          }),
        });

      if (!res.ok) throw new Error("Failed");

      Swal.fire({
        icon: "success",
        title: "Message sent",
        text: "Your message was sent successfully.",
        confirmButtonColor: "#16a34a",
      });

      setSenderName("");
      setSenderEmail("");
      setMessage("");

      setShowMessageForm(false);

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to send message. Please try again.",
        confirmButtonColor: "#dc2626",
      });
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const formatDate = d =>
    new Date(d + "T00:00:00").toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const formatTime = t =>
    new Date(`1970-01-01T${t}`).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-3">
      <div className="bg-white w-full max-w-xl rounded-t-2xl sm:rounded-2xl max-h-[95vh] overflow-y-auto shadow-2xl">

        <div className="bg-green-700 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            {event.title}
          </h3>
          <button onClick={onClose} className="text-white">
            <X />
          </button>
        </div>

        <div className="p-6 space-y-4 text-sm">
          <DetailRow icon={<CalendarDays />} label="Date">
            {event.start_date === event.end_date
              ? formatDate(event.start_date)
              : `${formatDate(event.start_date)} → ${formatDate(event.end_date)}`}
          </DetailRow>

          <DetailRow icon={<Clock />} label="Time">
            {formatTime(event.start_time)} – {formatTime(event.end_time)}
          </DetailRow>

          <DetailRow icon={<MapPin />} label="Location">
            {event.location || "N/A"}
          </DetailRow>

          <DetailRow icon={<User />} label={event.event_type === "invite" ? "Name" : "Organizer"}>
            {event.organizer || "N/A"}
          </DetailRow>

          {event.phone && (
            <DetailRow icon={<Phone />} label="Telegram">
              {event.phone}
            </DetailRow>
          )}

          {event.organizer_email && (
            <DetailRow icon={<Mail />} label="Email">
              <a
                href={`mailto:${event.organizer_email}`}
                className="text-blue-700 hover:underline break-all"
              >
                {event.organizer_email}
              </a>
            </DetailRow>
          )}

          {event.event_type === "invite" && (
            <DetailRow icon={<User />} label="Invite by Organization">
              {event.organization_invite || "N/A"}
            </DetailRow>
          )}

          <DetailRow icon={<FileText />} label="Description">
            {event.description || "No description"}
          </DetailRow>

          {event.files?.length > 0 && (
            <DetailRow
              icon={<Paperclip className="text-green-600" />}
              label="Files"
            >
              <EventFiles files={event.files} />
            </DetailRow>
          )}

          {event.event_type === "invite" && event.organizer_email && (
            <div className="pt-2">
              {!showMessageForm ? (
                <button
                  type="button"
                  onClick={() => setShowMessageForm(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Your Message
                </button>
              ) : (
                <div className="border rounded-xl p-4 space-y-3 bg-green-50">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-green-700">
                      Send Message
                    </p>

                    <button
                      type="button"
                      onClick={() => setShowMessageForm(false)}
                      className="text-gray-500 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </div>

                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your name"
                    className="w-full border rounded-md p-2"
                  />

                  <input
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full border rounded-md p-2"
                  />

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message"
                    className="w-full border rounded-md p-2"
                  />

                  <button
                    type="button"
                    onClick={sendMessage}
                    disabled={sending}
                    className="px-4 py-2 bg-green-600 text-white rounded-md disabled:opacity-60"
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* ================= DETAIL ROW ================= */
function DetailRow({ icon, label, children }) {
  return (
    <div className="flex gap-4">
      <div className="text-green-600">{icon}</div>
      <div>
        <p className="font-semibold">{label}: <span className="font-normal ml-2">{children}</span></p>
        <div></div>
      </div>
    </div>
  );
}
