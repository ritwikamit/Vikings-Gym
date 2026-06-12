'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, IndianRupee, CalendarCheck, UserPlus, Target, Activity, ArrowRight } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Stats = {
  totalMembers: number; activeMembers: number; expiredMembers: number;
  revenueThisMonth: number; revenueThisYear: number; attendanceToday: number;
  trainersCount: number; newMembersThisMonth: number; totalLeads: number;
};

function useStats() {
  const [data, setData] = useState<{ stats: Stats; monthlyRevenue: any[]; newMembers: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/dashboard/stats').then(r => r.json()).then(res => {
      if (res.data) setData({ stats: res.data.stats, monthlyRevenue: res.data.charts.monthlyRevenue, newMembers: res.data.charts.newMembersMonthly });
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);
  return { data, loading };
}

function StatCard({ title, value, icon: Icon, color, isCurrency }: { title: string; value: number; icon: any; color: string; isCurrency?: boolean }) {
  return (
    <div className="glass-card rounded-xl p-5 relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1.5">{title}</p>
          <p className="text-2xl font-bold text-white">{isCurrency ? `₹${(value || 0).toLocaleString('en-IN')}` : (value || 0).toLocaleString('en-IN')}</p>
        </div>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/[0.03] group-hover:scale-110 transition-transform">
          <Icon size={20} style={{ color }} />
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { data, loading } = useStats();

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="glass-card rounded-xl p-5"><div className="space-y-3"><div className="h-4 bg-white/5 rounded animate-pulse w-20" /><div className="h-7 bg-white/5 rounded animate-pulse w-16" /></div></div>
        ))}
      </div>
    );
  }

  if (!data) return <div className="text-white/40 text-sm">Failed to load dashboard data.</div>;

  const { stats, monthlyRevenue, newMembers } = data;

  const cards = [
    { title: 'Total Members', value: stats.totalMembers, icon: Users, color: '#3B82F6' },
    { title: 'Active Members', value: stats.activeMembers, icon: UserCheck, color: '#22C55E' },
    { title: 'Revenue This Month', value: stats.revenueThisMonth, icon: IndianRupee, color: '#F59E0B', isCurrency: true },
    { title: 'Attendance Today', value: stats.attendanceToday, icon: CalendarCheck, color: '#8B5CF6' },
    { title: 'New Members', value: stats.newMembersThisMonth, icon: UserPlus, color: '#06B6D4' },
    { title: 'Total Leads', value: stats.totalLeads, icon: Target, color: '#EC4899' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {cards.map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <StatCard {...c} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-bold text-white mb-6">Monthly Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs><linearGradient id="rev" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0EA5E9" stopOpacity={0.3} /><stop offset="100%" stopColor="#0EA5E9" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="month" stroke="#A3A3A3" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#A3A3A3" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip content={({ active, payload }) => active && payload?.length ? <div className="bg-black/90 border border-white/10 rounded-lg p-3 text-sm"><p className="text-white/50 text-xs">₹{(payload[0].value as number).toLocaleString('en-IN')}</p></div> : null} />
                <Area type="monotone" dataKey="revenue" stroke="#0EA5E9" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-sm font-bold text-white mb-6">New Members</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={newMembers}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="month" stroke="#A3A3A3" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#A3A3A3" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip content={({ active, payload }) => active && payload?.length ? <div className="bg-black/90 border border-white/10 rounded-lg p-3 text-sm"><p className="text-white">{payload[0].value} members</p></div> : null} />
                <Bar dataKey="members" fill="#0EA5E9" radius={[4, 4, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
