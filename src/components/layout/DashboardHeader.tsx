'use client';

import { Menu } from 'lucide-react';

export default function DashboardHeader({ onMobileMenuToggle }: { onMobileMenuToggle: () => void }) {
  return (
    <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 lg:px-6 bg-black/50 backdrop-blur-md">
      <button onClick={onMobileMenuToggle} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/5 text-white/40">
        <Menu size={18} />
      </button>
      <div className="flex-1" />
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg glass">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] flex items-center justify-center text-white font-bold text-xs">NK</div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white leading-none">Nihar Kumar</p>
            <p className="text-[10px] text-white/30 font-medium">Owner</p>
          </div>
        </div>
      </div>
    </header>
  );
}
