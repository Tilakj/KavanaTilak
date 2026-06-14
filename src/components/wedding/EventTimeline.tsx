"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Shirt, ArrowRight } from "lucide-react";
import { weddingConfig } from "@/utils/weddingConfig";

export default function EventTimeline() {
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
              <div className="absolute left-[-9px] top-6 w-4.5 h-4.5 rounded-full bg-[#050814] border-2 border-[#d4af37] flex items-center justify-center z-10 md:left-1/2 md:-translate-x-1/2">
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
                <div className="p-6 md:p-8 rounded-2xl bg-[#090f24]/85 border border-[#d4af37]/15 hover:border-[#d4af37]/35 shadow-[0_10px_35px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all group">
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

                  {/* Navigation Button */}
                  <div className={`mt-6 ${isEven ? "md:justify-end" : "md:justify-start"} flex`}>
                    <a
                      href={weddingConfig.venueMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 py-2 px-4 rounded-lg text-xs font-semibold text-slate-900 bg-gradient-to-r from-[#bf953f] to-[#fcf6ba] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_4px_15px_rgba(212,175,55,0.15)] cursor-pointer"
                    >
                      View Venue Map
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
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
