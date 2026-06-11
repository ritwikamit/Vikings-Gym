'use client';

import PortalSidebar from '@/components/layout/PortalSidebar';
import { DASHBOARD_SIDEBAR_LINKS } from '@/lib/constants';

export default function TrainerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[slate-900]">
      <PortalSidebar
        links={DASHBOARD_SIDEBAR_LINKS.trainer}
        role="trainer"
        userName="Vikram Singh"
        userEmail="vikram@vikingsgym.in"
      />
      <main className="lg:pl-[250px] pt-14 lg:pt-0">
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
