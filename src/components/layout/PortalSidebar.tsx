'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  Apple,
  Calendar,
  UserCircle,
  CreditCard,
  CalendarCheck,
  TrendingUp,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  LucideIcon,
  IndianRupee,
  Target,
  Package,
  BarChart3,
  Ticket,
  Megaphone,
  Bell,
  ScrollText,
  Settings,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  Dumbbell,
  Apple,
  Calendar,
  UserCircle,
  CreditCard,
  CalendarCheck,
  TrendingUp,
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

interface NavLink {
  name: string;
  href: string;
  icon: string;
}

interface PortalSidebarProps {
  links: readonly NavLink[];
  role: string;
  userName?: string;
  userEmail?: string;
}

export default function PortalSidebar({
  links,
  role,
  userName = 'User',
  userEmail = 'user@vikingsgym.in',
}: PortalSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="p-5 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Vikings Gym"
              fill
              className="object-contain p-0.5"
            />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-white text-base leading-tight">
                Vikings Gym
              </h1>
              <p className="text-[10px] text-[#737373] uppercase tracking-widest">
                {roleLabel} Portal
              </p>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = iconMap[link.icon] || LayoutDashboard;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-sky-500/10 text-sky-500 border-l-2 border-sky-500'
                  : 'text-[#A3A3A3] hover:bg-white/[0.05] hover:text-white'
              )}
            >
              <Icon className={cn('w-[18px] h-[18px] flex-shrink-0', isActive ? 'text-sky-500' : '')} />
              {!isCollapsed && <span>{link.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle (Desktop) */}
      <div className="hidden lg:block px-3 pb-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-[#737373] hover:text-white hover:bg-white/[0.05] transition-all text-sm"
        >
          <ChevronLeft
            className={cn(
              'w-4 h-4 transition-transform duration-300',
              isCollapsed && 'rotate-180'
            )}
          />
          {!isCollapsed && <span>Collapse</span>}
        </button>
      </div>

      {/* User Info */}
      <div className="p-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-600 to-red-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {initials}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {userName}
              </p>
              <p className="text-xs text-[#737373] truncate">{userEmail}</p>
            </div>
          )}
          {!isCollapsed && (
            <Link
              href="/login"
              className="text-[#737373] hover:text-sky-500 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="text-white p-1"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="relative w-7 h-7 rounded-md overflow-hidden border border-white/10">
                <Image
                  src="/logo.png"
                  alt="Vikings Gym"
              fill
              className="object-contain p-0.5"
            />
          </div>
          <span className="font-semibold text-white text-sm">
            Vikings Gym
          </span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-600 to-red-800 flex items-center justify-center text-white text-xs font-bold">
            {initials}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 z-50"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[260px] bg-[#0A0A0A] border-r border-white/[0.06] z-50 overflow-hidden"
            >
              <button
                onClick={() => setIsMobileOpen(false)}
                className="absolute top-4 right-4 text-[#737373] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:block fixed left-0 top-0 bottom-0 bg-[#0A0A0A] border-r border-white/[0.06] z-40 transition-all duration-300',
          isCollapsed ? 'w-[72px]' : 'w-[250px]'
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
