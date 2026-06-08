'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/constants';
import { SectionHeading, StaggerContainer, staggerItem, Reveal } from './shared';

export function BlogPreview() {
  return (
    <section className="section-padding bg-[#080808] relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C62828]/5 rounded-full blur-[120px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading badge="Latest News" title="Vikings Chronicles" subtitle="Training tips, nutrition guides, and stories from the arena." />
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {BLOG_POSTS.map((post) => (
            <motion.div key={post.title} variants={staggerItem}
              className="group relative rounded-[2rem] overflow-hidden bg-[#0A0A0A] border border-white/5 hover:border-[#C62828]/40 transition-all duration-500"
            >
              <div className="relative h-52 bg-gradient-to-br from-[#161616] to-black flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  <div className="absolute top-5 left-5 w-24 h-24 border-2 border-white/10 rounded-full" />
                  <div className="absolute bottom-5 right-5 w-32 h-32 border-2 border-[#C62828]/20 rounded-full" />
                </div>
                <div className="relative w-16 h-16 rounded-2xl bg-[#C62828]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <Trophy className="w-8 h-8 text-[#C62828]" />
                </div>
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#C62828] text-white text-[9px] font-bold tracking-wider uppercase">
                  {post.category}
                </span>
              </div>
              <div className="p-6 lg:p-8">
                <p className="text-[#737373] text-[10px] font-bold uppercase tracking-widest mb-3">{post.date}</p>
                <h3 className="text-lg font-bold text-white mb-3 tracking-tight leading-snug group-hover:text-[#C62828] transition-colors">{post.title}</h3>
                <p className="text-[#666] text-sm leading-relaxed mb-6">{post.excerpt}</p>
                <Link href={post.slug}
                  className="inline-flex items-center gap-2 text-[#C62828] text-xs font-bold tracking-widest uppercase group/link hover:text-white transition-colors"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
        <Reveal className="text-center mt-12">
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-[#737373] hover:text-[#C62828] text-sm font-bold tracking-widest uppercase transition-all group"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
