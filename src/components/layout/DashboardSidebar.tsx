'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DASHBOARD_SIDEBAR_LINKS, GYM_INFO } from '@/lib/constants';
import { Magnetic } from '@/components/ui/Magnetic';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  CalendarCheck,
  Dumbbell,
  IndianRupee,
  Target,
  Package,
  BarChart3,
  Ticket,
  Megaphone,
  Bell,
  ScrollText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  CreditCard,
  CalendarCheck,
  Dumbbell,
  IndianRupee,
  Target,
  Package,
  BarChart3,
  Ticket,
  Megaphone,
  Bell,
  ScrollText,
  Settings,
};

interface DashboardSidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export default function DashboardSidebar({ isMobileOpen, onMobileClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const links = DASHBOARD_SIDEBAR_LINKS.admin;

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen bg-[#0A0A0A] border-r border-white/5 flex flex-col transition-all duration-300 ease-in-out',
          'lg:relative lg:translate-x-0',
          isCollapsed ? 'lg:w-[80px]' : 'lg:w-[280px]',
          isMobileOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full w-[280px]'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-white/5 shrink-0">
          {!isCollapsed && (
            <Link href="/admin/dashboard" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0EA5E9] to-[#8E0000] flex items-center justify-center shadow-lg shadow-[#0EA5E9]/20 group-hover:scale-105 transition-transform">
                <span className="text-white font-black text-lg">V</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-black text-white tracking-tighter leading-none">VIKINGS</h1>
                <p className="text-[10px] text-[#0EA5E9] font-bold uppercase tracking-[0.2em] mt-1 leading-none">ADMIN</p>
              </div>
            </Link>
          )}
          {isCollapsed && (
            <Link href="/admin/dashboard" className="mx-auto group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0EA5E9] to-[#8E0000] flex items-center justify-center shadow-lg shadow-[#0EA5E9]/20 group-hover:scale-110 transition-transform">
                <span className="text-white font-black text-lg">V</span>
              </div>
            </Link>
          )}

          {/* Mobile Close */}
          <button onClick={onMobileClose} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-[#737373] hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1.5 scrollbar-hide">
          {links.map((link) => {
            const Icon = iconMap[link.icon] || LayoutDashboard;
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onMobileClose}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative',
                  isCollapsed ? 'justify-center px-0 h-11' : '',
                  isActive 
                    ? 'bg-[#0EA5E9]/10 text-[#0EA5E9]' 
                    : 'text-[#737373] hover:text-white hover:bg-white/[0.03]'
                )}
              >
                <Magnetic strength={0.2}>
                  <Icon size={isActive ? 20 : 18} className={cn('shrink-0 transition-transform group-hover:scale-110', isActive ? 'text-[#0EA5E9]' : '')} />
                </Magnetic>
                {!isCollapsed && (
                  <span className="truncate">{link.name}</span>
                )}
                {isActive && !isCollapsed && (
                  <motion.div layoutId="sidebar-active" className="absolute left-0 w-1 h-5 bg-[#0EA5E9] rounded-r-full" />
                )}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-[#161616] border border-white/10 rounded-xl text-xs font-bold text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all z-50 shadow-2xl">
                    {link.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle (Desktop) */}
        <div className="hidden lg:flex justify-center py-4 border-t border-white/5">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-[#737373] hover:text-white hover:bg-white/5 transition-all"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* User Info */}
        <div className={cn('border-t border-white/5 p-4 bg-[#0D0D0D]', isCollapsed && 'p-2')}>
          {!isCollapsed ? (
            <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0EA5E9] to-[#8E0000] flex items-center justify-center shrink-0 shadow-lg">
                <span className="text-white font-bold text-sm">NK</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate leading-none mb-1">Nihar Kumar</p>
                <p className="text-[10px] text-[#737373] font-bold uppercase tracking-wider">Owner</p>
              </div>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#737373] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-all">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0EA5E9] to-[#8E0000] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">NK</span>
              </div>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#737373] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-all">
                <LogOut size={16} />
              </button>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
}
