"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { weddingConfig } from "@/utils/weddingConfig";

export default function VenueMap() {
  return (
    <section className="py-20 px-4 max-w-5xl mx-auto relative z-10">
      {/* Title */}
      <div className="text-center mb-12 space-y-2">
        <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-gold-400 uppercase">
          Location & Directions
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-white font-light">
          The Venue
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Info Card */}
        <motion.div
          className="lg:col-span-5 space-y-6 lg:pr-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="p-6 md:p-8 rounded-2xl bg-royal-card/85 border border-gold-500/20 shadow-[0_10px_35px_rgba(0,0,0,0.4)] backdrop-blur-md">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-4 border border-[#d4af37]/20">
              <MapPin className="w-5 h-5 text-gold-400" />
            </div>

            <h3 className="font-serif text-2xl text-white font-medium mb-3">
              Shamanur Shivashankarappa Parvathamma Samudhaya Bhavana
            </h3>

            <p className="text-sm text-slate-400 leading-relaxed">
              SS Layout, Davanagere, <br />
              Karnataka 577004, India
            </p>

            <div className="mt-6">
              <a
                href={weddingConfig.venueMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-xl text-xs font-semibold text-slate-900 bg-gradient-to-r from-[#bf953f] to-[#fcf6ba] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_4px_15px_rgba(212,175,55,0.2)] cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                Navigate via Google Maps
              </a>
            </div>
          </div>
        </motion.div>

        {/* Embedded Map Card */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        >
          <div className="rounded-3xl border border-gold-500/20 bg-[#050814]/70 p-2 md:p-3 shadow-[0_15px_50px_rgba(0,0,0,0.6)] backdrop-blur-sm overflow-hidden group hover:border-[#d4af37]/45 transition-colors duration-300">
            <div className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden bg-royal-dark">
              {/* Google Map iframe */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3863.6633900320535!2d75.91705387510318!3d14.44655228602177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bba256b838c2ff5%3A0x7fc29f4d42783750!2sShamanur%20Shivashankarappa%20Parvathamma%20Samudhaya%20Bhavana!5e0!3m2!1sen!2ssg!4v1781438425306!5m2!1sen!2ssg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale opacity-80 contrast-115 brightness-90 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
              />
              {/* Dark aesthetic overlay that hides on hover */}
              <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-2xl transition-opacity duration-500" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
