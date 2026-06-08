"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent successfully! We will get back to you soon.");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6"
          >
            Contact <span className="text-red-600">Us</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Have questions? We're here to help you start your fitness journey.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-2xl border border-white/5 space-y-8">
              <h3 className="text-2xl font-bold text-white">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Location</h4>
                    <p className="text-gray-400">MG Road, Near Reliance Jewels,<br/>Aurangabad, Bihar - 824101</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Phone</h4>
                    <p className="text-gray-400">+91 77649 22023</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Email</h4>
                    <p className="text-gray-400">info@vikingsgym.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Operating Hours</h4>
                    <p className="text-gray-400">Mon - Sat: 5:00 AM - 10:00 PM<br/>Sunday: 6:00 AM - 12:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-64 glass rounded-2xl border border-white/5 overflow-hidden relative flex items-center justify-center">
              <div className="absolute inset-0 bg-[#141414] opacity-50 z-0"></div>
              <p className="relative z-10 text-gray-500 font-medium tracking-widest uppercase">Google Maps Integration</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-8 rounded-2xl border border-white/5"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">First Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Last Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-[#141414] border border-[#262626] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-4 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
