"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { useState } from "react";

const fadeLeft = { initial: { opacity: 0, x: -24 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6, ease: "easeOut" as const } };
const fadeRight = { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6, ease: "easeOut" as const } };

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#0F172A] pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 {...fadeLeft} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Contact <span className="gradient-text-violet">Us</span>
          </motion.h1>
          <motion.p {...fadeLeft} transition={{ ...fadeLeft.transition, delay: 0.1 }} className="text-[#666] text-lg">
            Have questions? We&apos;re here to help you start your fitness journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div {...fadeLeft} className="space-y-8">
            <div className="glass-card p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-8">Get in Touch</h3>
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: "Location", value: "MG Road, Near Reliance Jewels,\nAurangabad, Bihar - 824101" },
                  { icon: Phone, label: "Phone", value: "+91 77649 22023", href: "tel:+917764922023" },
                  { icon: Mail, label: "Email", value: "info@vikingsgym.in", href: "mailto:info@vikingsgym.in" },
                  { icon: Clock, label: "Hours", value: "Mon - Sat: 5:00 AM - 10:00 PM\nSunday: 6:00 AM - 12:00 PM" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-[#0EA5E9]" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">{item.label}</h4>
                      {item.href ? (
                        <a href={item.href} className="text-[#666] hover:text-white transition-colors whitespace-pre-line">{item.value}</a>
                      ) : (
                        <p className="text-[#666] whitespace-pre-line">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Map */}
            <div className="h-64 rounded-2xl border border-white/[0.04] overflow-hidden relative flex items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3626.7!2d84.3681875!3d24.7517185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398cfdda0d754111%3A0xf741105a5bcb783d!2sVIKINGS+GYM!5e0!3m2!1sen!2sin!4v1710000000000"
                width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Vikings Gym Location" />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div {...fadeRight} className="glass-card p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#A3A3A3]">First Name</label>
                  <input type="text" required
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9]/50 transition-colors"
                    placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#A3A3A3]">Last Name</label>
                  <input type="text" required
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9]/50 transition-colors"
                    placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#A3A3A3]">Email Address</label>
                <input type="email" required
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9]/50 transition-colors"
                  placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#A3A3A3]">Phone Number</label>
                <input type="tel" required
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9]/50 transition-colors"
                  placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#A3A3A3]">Message</label>
                <textarea required rows={4}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9]/50 transition-colors resize-none"
                  placeholder="How can we help you?" />
              </div>
              <button type="submit" disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-semibold text-sm text-white btn-primary disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
