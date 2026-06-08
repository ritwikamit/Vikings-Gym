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
    <div className="glass rounded-xl p-4 lg:p-5 card-hover">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}1a` }}>
          <Icon size={20} color={color} />
        </div>
        {change !== undefined && (
          <div className={cn(
            'flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
            (trend === 'up' || change > 0)
              ? 'text-[#22C55E] bg-[rgba(34,197,94,0.1)]'
              : 'text-[#EF4444] bg-[rgba(239,68,68,0.1)]'
          )}>
            {change > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
        {isCurrency ? formatCurrency(value) : value?.toLocaleString('en-IN') ?? '-'}
      </div>
      <p className="text-xs text-[#737373]">{title}</p>
    </div>
  );
}

function CustomTooltip({ active, payload, label, isCurrency }: { active?: boolean; payload?: any[]; label?: string; isCurrency?: boolean }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-3 shadow-xl">
      <p className="text-xs text-[#737373] mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="text-sm font-semibold text-white">
          {isCurrency ? formatCurrency(entry.value) : entry.value?.toLocaleString('en-IN')}
        </p>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div variants={itemVariants} className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-white">Monthly Revenue</h3>
              <p className="text-xs text-[#737373]">Revenue trend over the year</p>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E11D48" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#E11D48" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="month" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip isCurrency />} />
                <Area type="monotone" dataKey="revenue" stroke="#E11D48" strokeWidth={2} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-white">New Members</h3>
              <p className="text-xs text-[#737373]">Monthly acquisition</p>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={newMembers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="month" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="members" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div variants={itemVariants} className="glass rounded-xl p-5">
          <h3 className="text-base font-semibold text-white mb-4">Membership Distribution</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distribution} cx="50%" cy="50%" innerRadius={65} outerRadius={100} paddingAngle={4} dataKey="value">
                  {distribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0].payload;
                  return (
                    <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-3 shadow-xl">
                      <p className="text-sm font-semibold text-white">{d.name}</p>
                      <p className="text-xs text-[#737373]">{d.value} members</p>
                    </div>
                  );
                }} />
                <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" iconSize={8}
                  formatter={(value: string) => <span className="text-xs text-[#A3A3A3] ml-1">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass rounded-xl p-5">
          <h3 className="text-base font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-1">
            {recentActivities.map((a) => (
              <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.02] transition-colors">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${a.color}15` }}>
                  <a.icon size={16} color={a.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{a.description}</p>
                  <p className="text-xs text-[#737373] flex items-center gap-1 mt-0.5">
                    <Clock size={10} />{a.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="glass rounded-xl p-5">
        <h3 className="text-base font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button key={action.label}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/[0.02] border border-[#262626] hover:border-[#E11D48]/30 hover:bg-white/[0.04] transition-all group"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110" style={{ backgroundColor: action.bg }}>
                <action.icon size={20} color={action.color} />
              </div>
              <span className="text-xs font-medium text-[#A3A3A3] group-hover:text-white transition-colors text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
