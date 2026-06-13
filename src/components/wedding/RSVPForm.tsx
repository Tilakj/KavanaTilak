"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Star, MessageSquare } from "lucide-react";

interface Blessing {
  name: string;
  message: string;
  date: string;
}

export default function RSVPForm() {
  const [form, setForm] = useState({
    name: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [blessings, setBlessings] = useState<Blessing[]>([]);

  // Load sample initial blessings and check localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("wedding_blessings");
    if (saved) {
      setBlessings(JSON.parse(saved));
    } else {
      const defaultBlessings: Blessing[] = [
        {
          name: "Sanjay Kumar",
          message: "Congratulations Kavana & Tilak! Wishing you a lifetime of love, laughter, and endless happiness together. Can't wait to celebrate!",
          date: "1 hour ago",
        },
        {
          name: "Deepa & Anil",
          message: "May your wedding be the start of a beautiful story filled with sweet moments and golden memories. Heartiest congratulations!",
          date: "3 hours ago",
        },
        {
          name: "Kiran Gowda",
          message: "So happy for you both! Wishing you both a very happy married life. Best wishes for the big day!",
          date: "Yesterday",
        },
      ];
      setBlessings(defaultBlessings);
      localStorage.setItem("wedding_blessings", JSON.stringify(defaultBlessings));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    // Add new blessing
    const newBlessing: Blessing = {
      name: form.name,
      message: form.message,
      date: "Just now",
    };
    const updated = [newBlessing, ...blessings];
    setBlessings(updated);
    localStorage.setItem("wedding_blessings", JSON.stringify(updated));

    setSubmitted(true);
    setForm({ name: "", message: "" }); // Reset form fields
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative">
      {/* Background radial gradient decoration */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.02)_0%,rgba(0,0,0,0)_75%)] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16 space-y-2">
        <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-gold-400 uppercase">
          Guest Book
        </span>
        <h2 className="font-serif text-4xl md:text-5xl text-white font-light">
          Send Your Wishes
        </h2>
        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Blessings Submission Form Card (Col 7) */}
        <div className="lg:col-span-7 bg-[#090f24]/85 border border-[#d4af37]/15 rounded-3xl p-6 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="rsvp-name" className="block text-xs font-sans font-bold text-gold-400 uppercase tracking-widest">
                    Your Name *
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#050814]/85 border border-[#d4af37]/25 focus:border-[#d4af37] focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors"
                  />
                </div>

                {/* Blessing Message */}
                <div className="space-y-2">
                  <label htmlFor="rsvp-message" className="block text-xs font-sans font-bold text-gold-400 uppercase tracking-widest">
                    Warm Message & Blessing *
                  </label>
                  <textarea
                    id="rsvp-message"
                    required
                    rows={6}
                    placeholder="Write your wishes for Kavana & Tilak here..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#050814]/85 border border-[#d4af37]/25 focus:border-[#d4af37] focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl text-sm font-semibold text-slate-900 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] hover:scale-[1.015] active:scale-[0.985] transition-all flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(212,175,55,0.2)] cursor-pointer"
                >
                  Send Blessing
                  <Send className="w-4 h-4 shrink-0" />
                </button>
              </motion.form>
            ) : (
              <motion.div
                className="py-12 text-center space-y-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                
                <h3 className="font-serif text-3xl text-white font-medium">
                  Blessings Shared!
                </h3>
                
                <p className="text-sm text-slate-300 max-w-sm mx-auto font-sans leading-relaxed">
                  Your wishes and heartiest blessings have been successfully posted to our live wall. Thank you for your love and support!
                </p>

                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto pt-2" />

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-sans tracking-widest text-gold-400 uppercase hover:text-white transition-colors cursor-pointer"
                >
                  Send another blessing
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Live Blessings Board (Col 5) */}
        <div className="lg:col-span-5 h-[490px] flex flex-col bg-[#090f24]/85 border border-[#d4af37]/15 rounded-3xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-md overflow-hidden relative">
          <div className="flex items-center gap-2 mb-4 border-b border-[#d4af37]/15 pb-3">
            <MessageSquare className="w-4 h-4 text-gold-400" />
            <h3 className="text-xs font-sans font-bold text-white uppercase tracking-widest">
              Live Blessings Board
            </h3>
          </div>

          {/* Scrolling Blessings board container */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin">
            <AnimatePresence initial={false}>
              {blessings.map((blessing, idx) => (
                <motion.div
                  key={idx}
                  className="p-4 rounded-2xl bg-[#050814]/70 border border-[#d4af37]/10 space-y-2"
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-serif font-bold text-sm text-gold-300">
                      {blessing.name}
                    </span>
                    <span className="text-[9px] font-sans text-slate-500 flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 text-gold-500 fill-gold-500/30" />
                      {blessing.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed italic">
                    "{blessing.message}"
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Fade overlays for the blessings board scroll */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#090f24] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
