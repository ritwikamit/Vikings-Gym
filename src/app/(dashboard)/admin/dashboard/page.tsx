'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn, formatCurrency } from '@/lib/utils';
import {
  Users,
  UserCheck,
  UserX,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  UserPlus,
  CreditCard,
  CalendarCheck,
  Target,
  Activity,
  Clock,
  ArrowUpRight,
  ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

// ── Types ──
type Stats = {
  totalMembers: number; activeMembers: number; expiredMembers: number;
  expiringMembers: number; revenueThisMonth: number; revenueThisYear: number;
  attendanceToday: number; trainersCount: number; newMembersThisMonth: number;
  totalLeads: number;
};

type ChartData = { month: string; revenue: number }[];
type NewMemberData = { month: string; members: number }[];
type DistributionItem = { name: string; value: number; color: string };

// ── Custom Hooks ──
function useDashboardStats() {
  const [data, setData] = useState<{
    stats: Stats; monthlyRevenue: ChartData; newMembers: NewMemberData;
    distribution: DistributionItem[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(r => r.json())
      .then(res => {
        if (res.data) {
          const d = res.data;
          const colors = ['#3B82F6', '#22C55E', '#F59E0B', '#E11D48'];
          setData({
            stats: d.stats,
            monthlyRevenue: d.charts.monthlyRevenue,
            newMembers: d.charts.newMembersMonthly,
            distribution: d.charts.membershipDistribution.map((item: any, i: number) => ({
              ...item, color: colors[i % colors.length],
            })),
          });
        } else {
          setError('Failed to load dashboard data');
        }
      })
      .catch(() => setError('Failed to connect to server'))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

// ── Stat Card ──
function StatCard({ title, value, change, trend, icon: Icon, color, isCurrency }: {
  title: string; value: number; change?: number; trend?: 'up' | 'down';
  icon: any; color: string; isCurrency?: boolean;
}) {
  return (
    <div className="glass rounded-2xl p-5 lg:p-6 card-hover border-white/5 hover:border-white/10 transition-all duration-500 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-white/10 transition-colors" />
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/5 shadow-inner group-hover:scale-110 transition-transform duration-500">
          <Icon size={22} style={{ color }} />
        </div>
        {change !== undefined && (
          <div className={cn(
            'flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter',
            (trend === 'up' || change > 0)
              ? 'text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20'
              : 'text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/20'
          )}>
            {change > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="relative z-10">
        <div className="text-3xl lg:text-4xl font-black text-white mb-1 tracking-tighter">
          {isCurrency ? formatCurrency(value) : value?.toLocaleString('en-IN') ?? '-'}
        </div>
        <p className="text-[10px] font-bold text-[#737373] uppercase tracking-[0.2em]">{title}</p>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label, isCurrency }: { active?: boolean; payload?: any[]; label?: string; isCurrency?: boolean }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 shadow-2xl backdrop-blur-md">
      <p className="text-[10px] font-bold text-[#737373] uppercase tracking-widest mb-2 border-b border-white/5 pb-2">{label}</p>
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <p className="text-sm font-black text-white">
            {isCurrency ? formatCurrency(entry.value) : entry.value?.toLocaleString('en-IN')}
          </p>
        </div>
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.06 } },
};
const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// ── Page ──
export default function AdminDashboardPage() {
  const { data, loading, error } = useDashboardStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#E11D48] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-[#737373]">
        <AlertTriangle className="w-10 h-10 mb-3 text-[#EF4444]" />
        <p className="text-sm">{error || 'Failed to load'}</p>
      </div>
    );
  }

  const { stats, monthlyRevenue, newMembers, distribution } = data;

  const statCards = [
    { title: 'Total Members', value: stats.totalMembers, change: 12, trend: 'up' as const, icon: Users, color: '#3B82F6' },
    { title: 'Active Members', value: stats.activeMembers, change: 8, trend: 'up' as const, icon: UserCheck, color: '#22C55E' },
    { title: 'Expired Members', value: stats.expiredMembers, change: -5, trend: 'down' as const, icon: UserX, color: '#EF4444' },
    { title: 'Revenue This Month', value: stats.revenueThisMonth, change: 18, trend: 'up' as const, icon: IndianRupee, color: '#F59E0B', isCurrency: true },
    { title: 'Expiring Soon', value: stats.expiringMembers, icon: AlertTriangle, color: '#E11D48' },
    { title: 'Attendance Today', value: stats.attendanceToday, icon: CalendarCheck, color: '#8B5CF6' },
    { title: 'New Members', value: stats.newMembersThisMonth, icon: UserPlus, color: '#06B6D4' },
    { title: 'Total Leads', value: stats.totalLeads, icon: Target, color: '#EC4899' },
  ];

  const recentActivities = [
    { id: 1, type: 'member_joined', description: `${stats.newMembersThisMonth} new members this month`, time: 'This month', icon: UserPlus, color: '#22C55E' },
    { id: 2, type: 'payment', description: `₹${(stats.revenueThisMonth / 1000).toFixed(1)}k revenue generated`, time: 'This month', icon: IndianRupee, color: '#F59E0B' },
    { id: 3, type: 'attendance', description: `${stats.attendanceToday} members checked in today`, time: 'Today', icon: CalendarCheck, color: '#8B5CF6' },
    { id: 4, type: 'membership', description: `${stats.expiringMembers} memberships expiring in 7 days`, time: 'Urgent', icon: AlertTriangle, color: '#E11D48' },
    { id: 5, type: 'trainer', description: `${stats.trainersCount} active trainers on staff`, time: 'Active', icon: Users, color: '#3B82F6' },
  ];

  const quickActions = [
    { label: 'Add Member', icon: UserPlus, href: '/admin/members', color: '#22C55E', bg: 'rgba(34,197,94,0.1)' },
    { label: 'Record Payment', icon: IndianRupee, href: '/admin/payments', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
    { label: 'Mark Attendance', icon: CalendarCheck, href: '/admin/attendance', color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)' },
    { label: 'View Reports', icon: Activity, href: '/admin/reports', color: '#E11D48', bg: 'rgba(225,29,72,0.1)' },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <motion.div key={s.title} variants={itemVariants}>
            <StatCard {...s} />
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="glass rounded-[2rem] p-8 border-white/5 hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Monthly Revenue</h3>
              <p className="text-xs font-bold text-[#737373] uppercase tracking-widest mt-1">Growth Overview</p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C62828" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#C62828" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="month" stroke="#737373" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} tick={{ dy: 10 }} />
                <YAxis stroke="#737373" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip isCurrency />} cursor={{ stroke: '#C62828', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="revenue" stroke="#C62828" strokeWidth={3} fill="url(#revGrad)" animationDuration={1500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass rounded-[2rem] p-8 border-white/5 hover:border-white/10 transition-colors">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">New Members</h3>
              <p className="text-xs font-bold text-[#737373] uppercase tracking-widest mt-1">Acquisition Metrics</p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={newMembers}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="month" stroke="#737373" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} tick={{ dy: 10 }} />
                <YAxis stroke="#737373" fontSize={10} fontWeight="bold" tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="members" fill="#C62828" radius={[6, 6, 0, 0]} barSize={32} animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="glass rounded-[2rem] p-8 border-white/5 hover:border-white/10 transition-colors">
          <h3 className="text-xl font-bold text-white tracking-tight mb-8">Membership Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distribution} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={8} dataKey="value" stroke="none">
                  {distribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 shadow-2xl">
                      <p className="text-xs font-bold text-white uppercase tracking-widest">{d.name}</p>
                      <p className="text-xl font-black text-[#C62828] mt-1">{d.value} <span className="text-[10px] text-[#737373] font-bold">WARRIORS</span></p>
                    </div>
                  );
                }} />
                <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" iconSize={8}
                  formatter={(value: string) => <span className="text-xs font-bold text-[#A3A3A3] ml-2 uppercase tracking-widest">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass rounded-[2rem] p-8 border-white/5 hover:border-white/10 transition-colors">
          <h3 className="text-xl font-bold text-white tracking-tight mb-8">Recent Pulse</h3>
          <div className="space-y-2">
            {recentActivities.map((a) => (
              <div key={a.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all group">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform" style={{ backgroundColor: `${a.color}15`, border: `1px solid ${a.color}25` }}>
                  <a.icon size={18} color={a.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{a.description}</p>
                  <p className="text-[10px] text-[#737373] font-bold uppercase tracking-widest flex items-center gap-2 mt-1">
                    <Clock size={10} className="text-[#C62828]" />{a.time}
                  </p>
                </div>
                <ArrowRight size={14} className="text-[#333] group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="glass rounded-[2.5rem] p-10 border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
          <Dumbbell size={200} className="rotate-12" />
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight mb-8 relative z-10">Strategic Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 relative z-10">
          {quickActions.map((action) => (
            <Link key={action.label} href={action.href}
              className="flex flex-col items-center gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#C62828]/40 hover:bg-white/[0.05] transition-all group shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-2xl" style={{ backgroundColor: action.bg, border: `1px solid ${action.color}30` }}>
                <action.icon size={24} color={action.color} />
              </div>
              <span className="text-[10px] font-black text-[#737373] group-hover:text-white transition-colors text-center uppercase tracking-[0.2em]">{action.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
