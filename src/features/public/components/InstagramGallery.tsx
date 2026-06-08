'use client';

import { motion } from 'framer-motion';
import { GYM_INFO } from '@/lib/constants';
import { SectionHeading, StaggerContainer, staggerItem, Reveal } from './shared';

export function InstagramGallery() {
  const posts = [
    { likes: '2,847', caption: 'Monday motivation hits different at Vikings Gym', emoji: '🔥' },
    { likes: '1,932', caption: 'New PR alert! Crushing limits every single day', emoji: '💪' },
    { likes: '3,156', caption: 'Weekend warriors putting in the work', emoji: '⚔️' },
    { likes: '1,284', caption: 'Form check session with the elite coaching team', emoji: '🎯' },
    { likes: '2,563', caption: 'Transformations that speak for themselves', emoji: '📈' },
    { likes: '1,789', caption: 'Leg day? More like leg play at Vikings', emoji: '🦵' },
  ];

  const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );

  return (
    <section className="section-padding bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C62828]/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading badge="Social" title="Follow the Tribe" subtitle="Real warriors, real results. See what happens at Vikings Gym every day." />
        
        {/* Instagram Profile Header */}
        <Reveal>
          <a href={GYM_INFO.instagram} target="_blank" rel="noopener noreferrer"
            className="group flex items-center gap-6 p-6 sm:p-8 mb-10 rounded-[2rem] glass-card max-w-lg mx-auto hover:border-[#C62828]/30 transition-all duration-500"
          >
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C62828] via-purple-500 to-yellow-500 p-[3px]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <span className="text-3xl font-black text-white">V</span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#C62828] flex items-center justify-center shadow-lg">
                <InstagramIcon />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-white font-bold text-base truncate">vikings_fitness</span>
                <svg viewBox="0 0 24 24" fill="#1DA1F2" className="w-4 h-4 shrink-0">
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.867-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.13-.036.26-.036.39 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.13-.017-.26-.035-.39 1.16-.687 1.942-1.99 1.942-3.486zM12 16.5c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
                </svg>
              </div>
              <div className="flex items-center gap-4 text-xs text-[#737373]">
                <span><strong className="text-white font-bold">286</strong> posts</span>
                <span><strong className="text-white font-bold">1.2K</strong> followers</span>
                <span><strong className="text-white font-bold">12</strong> following</span>
              </div>
              <p className="text-[#A3A3A3] text-xs mt-1 truncate">Vikings Gym — Unleash The Warrior Within</p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center px-5 py-2 rounded-xl bg-[#C62828] text-white text-[10px] font-bold tracking-wider uppercase hover:bg-[#A32020] transition-colors shadow-lg">
                Follow
              </span>
            </div>
          </a>
        </Reveal>

        {/* Instagram Posts Grid */}
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {posts.map((post) => (
            <motion.div key={post.caption} variants={staggerItem}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-[#161616] border border-white/5 hover:border-[#C62828]/40 transition-all duration-500 cursor-pointer"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl sm:text-6xl opacity-30 group-hover:opacity-50 transition-opacity group-hover:scale-110 transition-transform duration-500">
                  {post.emoji}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg viewBox="0 0 24 24" fill="#C62828" className="w-3.5 h-3.5">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span className="text-white text-[10px] font-bold">{post.likes}</span>
                </div>
                <p className="text-white/80 text-[9px] leading-tight line-clamp-2">{post.caption}</p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        <Reveal className="text-center mt-10">
          <a href={GYM_INFO.instagram} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#C62828] to-purple-600 text-white text-xs font-bold tracking-widest uppercase hover:scale-105 transition-all duration-500 shadow-xl shadow-[#C62828]/20"
          >
            <InstagramIcon />
            Follow on Instagram
          </a>
        </Reveal>
      </div>
    </section>
  );
}
