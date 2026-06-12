'use client';

import { useState } from 'react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import DashboardHeader from '@/components/layout/DashboardHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-black">
      <DashboardSidebar isMobileOpen={isMobileOpen} onMobileClose={() => setIsMobileOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMobileMenuToggle={() => setIsMobileOpen(!isMobileOpen)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
