"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY_PREFIX = "event_notification_dismissed_";

function shouldShow(id, neverShowAgainDays) {
  if (typeof window === "undefined") return false;
  const raw = localStorage.getItem(STORAGE_KEY_PREFIX + id);
  if (!raw) return true;

  if (!neverShowAgainDays) return false;

  try {
    const dismissedAt = parseInt(raw, 10);
    const ms = neverShowAgainDays * 24 * 60 * 60 * 1000;
    return Date.now() - dismissedAt > ms;
  } catch {
    return false;
  }
}

export default function EventBellNotification({
  event,
  position = "top-right", // currently only top-right
}) {
  const [unread, setUnread] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = shouldShow(event.id, event.neverShowAgainDays);
    setUnread(show);
  }, [event.id, event.neverShowAgainDays]);

  const handleOpen = () => {
    setOpen((o) => !o);
  };

  const dismissForever = () => {
    localStorage.setItem(STORAGE_KEY_PREFIX + event.id, String(Date.now()));
    setUnread(false);
    setOpen(false);
  };

  const posClass =
    position === "top-right"
      ? "top-4 right-4 md:top-6 md:right-6"
      : "top-4 right-4"; // (extend if you add more positions)

  return (
    <>
      {/* Bell */}
      <div className={`fixed z-[9999] ${posClass} flex flex-col items-end`}>
        <button
          onClick={handleOpen}
          aria-label="Notifications"
          className={`relative flex items-center justify-center w-12 h-12 rounded-full bg-black/70 text-white backdrop-blur border border-white/10 shadow-lg
            hover:bg-black/80 transition focus:outline-none focus:ring-2 focus:ring-cyan-400
            ${unread ? "animate-bell-shake" : ""}`}
        >
          {/* Bell icon (emoji for simplicity). Swap for an SVG if you like */}
          🔔
          {/* Red dot badge */}
          {unread && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 ring-2 ring-black" />
          )}
        </button>

        {/* Mini “New event” pill */}
        {unread && !open && (
          <span className="mt-2 text-xs bg-cyan-500 text-black font-semibold rounded-full px-2 py-0.5 shadow">
            New event
          </span>
        )}

        {/* The expanded card */}
        <div
          className={`mt-3 w-[92vw] max-w-sm md:max-w-md bg-black/85 text-white rounded-2xl shadow-2xl backdrop-blur-md border border-white/10 p-4 md:p-5
            transition-all duration-200 origin-top-right
            ${
              open
                ? "scale-100 opacity-100"
                : "scale-95 opacity-0 pointer-events-none"
            }`}
        >
          {event.image && (
            <img
              src={typeof event.image === 'string' ? event.image : event.image.src || event.image}
              alt={event.title}
              className="w-full h-full object-cover rounded-xl mb-3"
            />
          )}

          <h3 className="text-lg md:text-xl font-extrabold tracking-tight text-cyan-400 drop-shadow-[0_0_4px_rgba(0,255,255,0.6)]">
            {event.title}
          </h3>

          {event.date && (
            <p className="text-xs md:text-sm text-white/70 mt-0.5">
              {event.date}
            </p>
          )}

          <p className="text-sm md:text-base mt-2 leading-snug text-white/90">
            {event.description}
          </p>

          <div className="mt-4 flex items-center gap-2 md:gap-3">
            <a
              href={event.ctaUrl}
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 transition focus:outline-none focus:ring-2 focus:ring-cyan-300"
            >
              {event.ctaLabel || "Register now"}
            </a>

            <button
              onClick={dismissForever}
              className="text-xs md:text-sm text-white/60 hover:text-white/90 underline underline-offset-4"
            >
              Don’t show again
            </button>

            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-xs md:text-sm text-white/60 hover:text-white/90"
              aria-label="Close notification"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
