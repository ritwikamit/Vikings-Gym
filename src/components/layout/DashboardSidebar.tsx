'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Users, CreditCard, CalendarCheck, Dumbbell,
  IndianRupee, Target, Package, BarChart3, Ticket, Megaphone,
  Bell, ScrollText, Settings, LogOut, ChevronLeft, Menu, X,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard, Users, CreditCard, CalendarCheck, Dumbbell,
  IndianRupee, Target, Package, BarChart3, Ticket, Megaphone,
  Bell, ScrollText, Settings,
};

const links = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
  { name: 'Members', href: '/admin/members', icon: 'Users' },
  { name: 'Memberships', href: '/admin/memberships', icon: 'CreditCard' },
  { name: 'Attendance', href: '/admin/attendance', icon: 'CalendarCheck' },
  { name: 'Payments', href: '/admin/payments', icon: 'IndianRupee' },
  { name: 'Trainers', href: '/admin/trainers', icon: 'Dumbbell' },
  { name: 'Leads', href: '/admin/leads', icon: 'Target' },
  { name: 'Inventory', href: '/admin/inventory', icon: 'Package' },
  { name: 'Reports', href: '/admin/reports', icon: 'BarChart3' },
  { name: 'Coupons', href: '/admin/coupons', icon: 'Ticket' },
  { name: 'Announcements', href: '/admin/announcements', icon: 'Megaphone' },
  { name: 'Notifications', href: '/admin/notifications', icon: 'Bell' },
  { name: 'Audit Logs', href: '/admin/audit-logs', icon: 'ScrollText' },
  { name: 'Settings', href: '/admin/settings', icon: 'Settings' },
];

export default function DashboardSidebar({ isMobileOpen, onMobileClose }: { isMobileOpen: boolean; onMobileClose: () => void }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden" onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      <aside className={cn(
        'fixed top-0 left-0 z-50 h-screen bg-black border-r border-white/5 flex flex-col transition-all duration-300',
        'lg:relative lg:translate-x-0',
        collapsed ? 'lg:w-[72px]' : 'lg:w-[260px]',
        isMobileOpen ? 'translate-x-0 w-[260px]' : '-translate-x-full w-[260px]'
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/5 shrink-0">
          {!collapsed && (
            <Link href="/admin/dashboard" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0EA5E9] flex items-center justify-center"><span className="text-white font-black text-sm">V</span></div>
              <span className="text-sm font-black text-white">VIKINGS</span>
            </Link>
          )}
          {collapsed && <Link href="/admin/dashboard" className="mx-auto"><div className="w-8 h-8 rounded-lg bg-[#0EA5E9] flex items-center justify-center"><span className="text-white font-black text-sm">V</span></div></Link>}
          <button onClick={onMobileClose} className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/40"><X size={16} /></button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
          {links.map((link) => {
            const Icon = iconMap[link.icon] || LayoutDashboard;
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link key={link.href} href={link.href} onClick={onMobileClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  collapsed ? 'justify-center px-0' : '',
                  isActive ? 'bg-[#0EA5E9]/10 text-[#0EA5E9]' : 'text-white/40 hover:text-white hover:bg-white/5'
                )}
              >
                <Icon size={18} />
                {!collapsed && <span className="truncate">{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex justify-center py-3 border-t border-white/5">
          <button onClick={() => setCollapsed(!collapsed)} className="w-7 h-7 flex items-center justify-center rounded text-white/30 hover:text-white/70 hover:bg-white/5 transition-all">
            <ChevronLeft size={14} className={cn('transition-transform', collapsed && 'rotate-180')} />
          </button>
        </div>
      </aside>
    </>
  );
}
