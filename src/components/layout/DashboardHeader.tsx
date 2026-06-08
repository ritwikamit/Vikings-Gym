'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Menu,
  Search,
  Bell,
  ChevronRight,
  User,
  Settings,
  LogOut,
  HelpCircle,
} from 'lucide-react';

interface DashboardHeaderProps {
  onMobileMenuToggle: () => void;
}

const pageTitles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/members': 'Member Management',
  '/admin/memberships': 'Memberships',
  '/admin/attendance': 'Attendance',
  '/admin/trainers': 'Trainers',
  '/admin/payments': 'Payments',
  '/admin/leads': 'Leads CRM',
  '/admin/inventory': 'Inventory',
  '/admin/reports': 'Reports',
  '/admin/coupons': 'Coupons',
  '/admin/announcements': 'Announcements',
  '/admin/notifications': 'Notifications',
  '/admin/audit-logs': 'Audit Logs',
  '/admin/settings': 'Settings',
};

export default function DashboardHeader({ onMobileMenuToggle }: DashboardHeaderProps) {
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const pageTitle = pageTitles[pathname] || 'Dashboard';

  const breadcrumbs = pathname
    .split('/')
    .filter(Boolean)
    .map((segment, index, arr) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
      href: '/' + arr.slice(0, index + 1).join('/'),
      isLast: index === arr.length - 1,
    }));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showSearch && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showSearch]);

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#262626]">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left: Mobile Menu + Breadcrumbs */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg text-[#A3A3A3] hover:text-white hover:bg-[#1A1A1A] transition-colors"
          >
            <Menu size={20} />
          </button>

          <div className="hidden sm:flex flex-col">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-xs text-[#737373]">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight size={12} />}
                  <span className={cn(crumb.isLast ? 'text-[#A3A3A3]' : '')}>{crumb.name}</span>
                </span>
              ))}
            </div>
            {/* Page Title */}
            <h1 className="text-lg font-semibold text-white">{pageTitle}</h1>
          </div>

          {/* Mobile title */}
          <h1 className="sm:hidden text-lg font-semibold text-white">{pageTitle}</h1>
        </div>

        {/* Right: Search, Notifications, User */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 240, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => {
                    if (!searchQuery) setShowSearch(false);
                  }}
                  className="w-full h-9 px-3 rounded-lg bg-[#1A1A1A] border border-[#333333] text-sm text-white placeholder-[#737373] focus:outline-none focus:border-[#DC2626] transition-colors"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-lg text-[#A3A3A3] hover:text-white hover:bg-[#1A1A1A] transition-colors"
          >
            <Search size={18} />
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-[#A3A3A3] hover:text-white hover:bg-[#1A1A1A] transition-colors">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#DC2626] text-[10px] font-bold text-white flex items-center justify-center">
              5
            </span>
          </button>

          {/* User Dropdown */}
          <div ref={userMenuRef} className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#1A1A1A] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#DC2626] to-[#991B1B] flex items-center justify-center">
                <span className="text-white font-semibold text-xs">NK</span>
              </div>
              <span className="hidden md:block text-sm text-[#A3A3A3]">Nihar</span>
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-[#1A1A1A] border border-[#333333] shadow-2xl overflow-hidden"
                >
                  <div className="p-3 border-b border-[#262626]">
                    <p className="text-sm font-medium text-white">Nihar Kumar</p>
                    <p className="text-xs text-[#737373]">admin@vikingsgym.in</p>
                  </div>
                  <div className="py-1">
                    {[
                      { icon: User, label: 'Profile', href: '#' },
                      { icon: Settings, label: 'Settings', href: '/admin/settings' },
                      { icon: HelpCircle, label: 'Help & Support', href: '#' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#A3A3A3] hover:text-white hover:bg-[#262626] transition-colors"
                      >
                        <item.icon size={16} />
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-[#262626] py-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-[#EF4444] hover:bg-[#262626] transition-colors">
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
