"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Shirt, ArrowRight, Calendar } from "lucide-react";
import { weddingConfig, WeddingEvent } from "@/utils/weddingConfig";

function getGoogleCalendarLink(event: WeddingEvent) {
  const title = encodeURIComponent(`${weddingConfig.couple.first} & ${weddingConfig.couple.second} Wedding - ${event.name}`);
  const details = encodeURIComponent(event.description || "");
  const location = encodeURIComponent(`${event.venue}, Davanagere, Karnataka, India`);
  
  let startStr = "";
  let endStr = "";
  
  if (event.id === "reception") {
    // Nov 28, 2026, 7:00 PM IST -> 13:30 UTC
    startStr = "20261128T133000Z";
    endStr = "20261128T163000Z";
  } else if (event.id === "muhurtha") {
    // Nov 29, 2026, 9:00 AM IST -> 03:30 UTC
    startStr = "20261129T033000Z";
    endStr = "20261129T063000Z";
  } else {
    startStr = "20261129T033000Z";
    endStr = "20261129T063000Z";
  }
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}`;
}

function downloadIcsFile(event: WeddingEvent) {
  const title = `${weddingConfig.couple.first} & ${weddingConfig.couple.second} Wedding - ${event.name}`;
  const description = event.description || "";
  const location = `${event.venue}, Davanagere, Karnataka, India`;
  
  let startStr = "";
  let endStr = "";
  
  if (event.id === "reception") {
    startStr = "20261128T133000Z";
    endStr = "20261128T163000Z";
  } else if (event.id === "muhurtha") {
    startStr = "20261129T033000Z";
    endStr = "20261129T063000Z";
  } else {
    startStr = "20261129T033000Z";
    endStr = "20261129T063000Z";
  }

  const stamp = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  
  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kavana Tilak Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}-wedding@kavanatilak`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "SEQUENCE:0",
    "STATUS:CONFIRMED",
    "TRANSP:OPAQUE",
    "END:VEVENT",
    "END:VCALENDAR"
  ];

  const icsString = icsLines.join("\r\n");
  const blob = new Blob([icsString], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${event.id}_wedding_event.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


export default function EventTimeline() {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  useEffect(() => {
    if (!openDropdownId) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".calendar-dropdown-container")) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [openDropdownId]);

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto relative">
      {/* section title */}
      <div className="text-center mb-16 space-y-2">
        <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-gold-400 uppercase">
          Wedding Schedule
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-white font-light">
          The Celebrations
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
      </div>

      <div className="relative border-l-2 border-dashed border-[#d4af37]/20 md:border-l-0 md:before:content-[''] md:before:absolute md:before:left-1/2 md:before:top-0 md:before:h-full md:before:w-[2px] md:before:bg-gradient-to-b md:before:from-[#bf953f] md:before:via-[#d4af37] md:before:to-[#aa771c] md:before:-translate-x-1/2">
        {weddingConfig.events.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={event.id}
              className="relative pl-8 md:pl-0 md:grid md:grid-cols-12 md:gap-8 mb-16 last:mb-0 items-center"
            >
              {/* Timeline Gold Center Node (Lotus Marker) */}
              <div className="absolute left-[-9px] top-6 w-4.5 h-4.5 rounded-full bg-background border-2 border-[#d4af37] flex items-center justify-center z-10 md:left-1/2 md:-translate-x-1/2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
              </div>

              {/* Event Card Content (slides in dynamically) */}
              <motion.div
                className={`md:col-span-5 ${
                  isEven ? "md:text-right md:col-start-1" : "md:col-start-8"
                }`}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="p-6 md:p-8 rounded-2xl bg-royal-card/85 border border-gold-500/20 hover:border-gold-500/40 shadow-[0_10px_35px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all group">
                  <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#d4af37] uppercase">
                    {event.date}
                  </span>
                  
                  <h3 className="font-serif text-2xl text-white font-medium my-2 group-hover:text-gold-300 transition-colors">
                    {event.name}
                  </h3>

                  <p className="text-xs text-slate-400 font-sans leading-relaxed mb-4">
                    {event.description}
                  </p>

                  <div className={`space-y-2.5 text-xs text-slate-300 ${isEven ? "md:flex md:flex-col md:items-end" : "md:flex md:flex-col md:items-start"}`}>
                    {/* Time */}
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gold-500 shrink-0" />
                      <span>{event.time}</span>
                    </div>

                    {/* Dress Code */}
                    {event.dressCode && (
                      <div className="flex items-center gap-2">
                        <Shirt className="w-4 h-4 text-gold-500 shrink-0" />
                        <span>
                          Dress Code: <strong className="text-white font-medium">{event.dressCode}</strong>
                        </span>
                      </div>
                    )}

                    {/* Venue */}
                    <div className="flex items-center gap-2 max-w-xs">
                      <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className={`mt-6 ${isEven ? "md:justify-end" : "md:justify-start"} flex flex-wrap gap-3 items-center calendar-dropdown-container`}>
                    <a
                      href={weddingConfig.venueMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 py-2 px-4 rounded-lg text-xs font-semibold text-slate-900 bg-gradient-to-r from-[#bf953f] to-[#fcf6ba] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_4px_15px_rgba(212,175,55,0.15)] cursor-pointer"
                    >
                      View Venue Map
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>

                    <div className="relative">
                      <button
                        onClick={() => setOpenDropdownId(openDropdownId === event.id ? null : event.id)}
                        className="inline-flex items-center gap-1.5 py-2 px-4 rounded-lg text-xs font-semibold text-white border border-[#d4af37]/35 hover:border-[#d4af37]/60 hover:bg-[#d4af37]/5 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5 text-gold-400" />
                        Add to Calendar
                      </button>

                      <AnimatePresence>
                        {openDropdownId === event.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute bottom-full mb-2 left-0 md:left-auto md:right-0 z-50 w-44 rounded-xl border border-[#d4af37]/20 bg-[#050814]/95 backdrop-blur-md shadow-2xl py-1.5"
                          >
                            <button
                              onClick={() => {
                                window.open(getGoogleCalendarLink(event), "_blank");
                                setOpenDropdownId(null);
                              }}
                              className="w-full text-left px-4 py-2.5 text-xs text-slate-200 hover:bg-[#d4af37]/10 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
                            >
                              <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
                              Google Calendar
                            </button>
                            <button
                              onClick={() => {
                                downloadIcsFile(event);
                                setOpenDropdownId(null);
                              }}
                              className="w-full text-left px-4 py-2.5 text-xs text-slate-200 hover:bg-[#d4af37]/10 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
                            >
                              <span className="w-2 h-2 rounded-full bg-[#107C41]" />
                              iCal / Outlook (.ics)
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Empty placeholder on the other side of center line in desktop */}
              <div className={`hidden md:block md:col-span-5 ${isEven ? "md:col-start-8" : "md:col-start-1"}`} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
