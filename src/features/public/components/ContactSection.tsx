'use client';

import { useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { GYM_INFO } from '@/lib/constants';
import { SectionHeading, Reveal } from './shared';

export function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormState({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  const cards = [
    { icon: Phone, label: 'Hotline', value: GYM_INFO.phone, href: `tel:${GYM_INFO.phone}`, color: '#C62828' },
    { icon: Mail, label: 'Email', value: GYM_INFO.email, href: `mailto:${GYM_INFO.email}`, color: '#3B82F6' },
    { icon: MapPin, label: 'Location', value: GYM_INFO.address, color: '#10B981' },
    { icon: Clock, label: 'Training Hours', value: `Weekdays: ${GYM_INFO.hours.weekdays}\nWeekends: ${GYM_INFO.hours.weekends}`, color: '#F59E0B' },
  ];

  return (
    <section className="section-padding bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Connect" title="Join the Tribe" subtitle="Have questions or ready to start? Our team is standing by to help you." />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Form */}
          <Reveal direction="left">
            <div className="p-8 sm:p-12 rounded-[2.5rem] glass-card relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C62828] to-transparent" />
              <h3 className="text-2xl font-bold text-white mb-8 tracking-tight">Drop a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Full Name</label>
                    <input type="text" required value={formState.name} onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                      className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C62828] focus:bg-white/[0.05] transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Email Address</label>
                    <input type="email" required value={formState.email} onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                      className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C62828] focus:bg-white/[0.05] transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Phone Number</label>
                  <input type="tel" value={formState.phone} onChange={(e) => setFormState(s => ({ ...s, phone: e.target.value }))}
                    className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C62828] focus:bg-white/[0.05] transition-all" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest ml-1">Your Message</label>
                  <textarea required rows={4} value={formState.message} onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                    className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#C62828] focus:bg-white/[0.05] transition-all resize-none" placeholder="How can we help you conquer your goals?" />
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-sm tracking-[0.2em] uppercase text-white bg-[#C62828] hover:bg-[#A32020] transition-all duration-300 shadow-xl shadow-[#C62828]/20 disabled:opacity-50">
                  {isSubmitting ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <span><Send className="w-4 h-4 inline mr-2" />Send Message</span>}
                </button>
              </form>
            </div>
          </Reveal>

          {/* Info + Map */}
          <Reveal direction="right">
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {cards.map((card) => (
                  <div key={card.label} className="group p-6 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-[#C62828]/30 transition-all duration-500">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-5 group-hover:bg-[#C62828]/10 transition-colors shadow-lg">
                      <card.icon className="w-6 h-6 text-[#C62828]" />
                    </div>
                    <p className="text-[#737373] text-[10px] uppercase tracking-[0.2em] font-bold mb-2">{card.label}</p>
                    {card.href ? (
                      <a href={card.href} className="text-white text-base font-bold hover:text-[#C62828] transition-colors whitespace-pre-line leading-relaxed">{card.value}</a>
                    ) : (
                      <p className="text-white text-base font-bold whitespace-pre-line leading-relaxed">{card.value}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="rounded-[2.5rem] overflow-hidden border border-white/5 h-[300px] sm:h-[350px] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3626.7!2d84.3681875!3d24.7517185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398cfdda0d754111%3A0xf741105a5bcb783d!2sVIKINGS+GYM!5e0!3m2!1sen!2sin!4v1710000000000"
                  width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(0.5)' }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Vikings Gym Location" />
                <div className="absolute inset-0 pointer-events-none border-[12px] border-black/20 rounded-[2.5rem]" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
