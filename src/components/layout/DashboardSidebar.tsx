'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DASHBOARD_SIDEBAR_LINKS, GYM_INFO } from '@/lib/constants';
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
          'fixed top-0 left-0 z-50 h-screen bg-[#111111] border-r border-[#262626] flex flex-col transition-all duration-300 ease-in-out',
          'lg:relative lg:translate-x-0',
          isCollapsed ? 'lg:w-[72px]' : 'lg:w-[280px]',
          isMobileOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full w-[280px]'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#262626] shrink-0">
          {!isCollapsed && (
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#DC2626] to-[#991B1B] flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <div>
                <h1 className="text-sm font-bold text-white tracking-wide">{GYM_INFO.name}</h1>
                <p className="text-[10px] text-[#737373] uppercase tracking-widest">Admin Panel</p>
              </div>
            </Link>
          )}
          {isCollapsed && (
            <Link href="/admin/dashboard" className="mx-auto">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#DC2626] to-[#991B1B] flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
            </Link>
          )}

          {/* Mobile Close */}
          <button onClick={onMobileClose} className="lg:hidden p-1 text-[#737373] hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {links.map((link) => {
            const Icon = iconMap[link.icon] || LayoutDashboard;
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onMobileClose}
                className={cn(
                  'sidebar-link group relative',
                  isCollapsed && 'justify-center px-2',
                  isActive && 'active'
                )}
              >
                <Icon size={20} className={cn('shrink-0', isActive ? 'text-[#DC2626]' : 'text-[#737373] group-hover:text-white')} />
                {!isCollapsed && (
                  <span className={cn(isActive ? 'text-[#DC2626] font-semibold' : '')}>
                    {link.name}
                  </span>
                )}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1A1A] border border-[#333333] rounded-md text-xs text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
                    {link.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle (Desktop) */}
        <div className="hidden lg:flex justify-center py-2 border-t border-[#262626]">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg text-[#737373] hover:text-white hover:bg-[#1A1A1A] transition-colors"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* User Info */}
        <div className={cn('border-t border-[#262626] p-4 shrink-0', isCollapsed && 'p-2')}>
          {!isCollapsed ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#DC2626] to-[#991B1B] flex items-center justify-center shrink-0">
                <span className="text-white font-semibold text-sm">NK</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Nihar Kumar</p>
                <p className="text-xs text-[#737373]">Admin</p>
              </div>
              <button className="p-1.5 rounded-lg text-[#737373] hover:text-[#EF4444] hover:bg-[#1A1A1A] transition-colors">
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#DC2626] to-[#991B1B] flex items-center justify-center">
                <span className="text-white font-semibold text-xs">NK</span>
              </div>
              <button className="p-1.5 rounded-lg text-[#737373] hover:text-[#EF4444] hover:bg-[#1A1A1A] transition-colors">
                <LogOut size={14} />
              </button>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  );
}
