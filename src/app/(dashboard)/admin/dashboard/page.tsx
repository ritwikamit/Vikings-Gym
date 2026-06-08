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
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// --- Mock Data ---
const statsData = [
  { title: 'Total Members', value: 248, change: 12, trend: 'up' as const, icon: Users, color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
  { title: 'Active Members', value: 186, change: 8, trend: 'up' as const, icon: UserCheck, color: '#22C55E', bg: 'rgba(34,197,94,0.1)' },
  { title: 'Expired Members', value: 34, change: -5, trend: 'down' as const, icon: UserX, color: '#EF4444', bg: 'rgba(239,68,68,0.1)' },
  { title: 'Revenue This Month', value: 285000, change: 18, trend: 'up' as const, icon: IndianRupee, color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', isCurrency: true },
];

const revenueData = [
  { month: 'Jan', revenue: 185000 },
  { month: 'Feb', revenue: 210000 },
  { month: 'Mar', revenue: 195000 },
  { month: 'Apr', revenue: 240000 },
  { month: 'May', revenue: 260000 },
  { month: 'Jun', revenue: 285000 },
  { month: 'Jul', revenue: 270000 },
  { month: 'Aug', revenue: 310000 },
  { month: 'Sep', revenue: 295000 },
  { month: 'Oct', revenue: 320000 },
  { month: 'Nov', revenue: 340000 },
  { month: 'Dec', revenue: 365000 },
];

const newMembersData = [
  { month: 'Jan', members: 18 },
  { month: 'Feb', members: 24 },
  { month: 'Mar', members: 20 },
  { month: 'Apr', members: 28 },
  { month: 'May', members: 32 },
  { month: 'Jun', members: 22 },
  { month: 'Jul', members: 26 },
  { month: 'Aug', members: 30 },
  { month: 'Sep', members: 35 },
  { month: 'Oct', members: 28 },
  { month: 'Nov', members: 38 },
  { month: 'Dec', members: 42 },
];

const attendanceData = [
  { day: 'Mon', count: 72 },
  { day: 'Tue', count: 85 },
  { day: 'Wed', count: 68 },
  { day: 'Thu', count: 90 },
  { day: 'Fri', count: 78 },
  { day: 'Sat', count: 95 },
  { day: 'Sun', count: 45 },
];

const membershipDistribution = [
  { name: 'Monthly', value: 65, color: '#3B82F6' },
  { name: 'Quarterly', value: 85, color: '#22C55E' },
  { name: 'Half-Yearly', value: 52, color: '#F59E0B' },
  { name: 'Annual', value: 46, color: '#DC2626' },
];

const recentActivities = [
  { id: 1, type: 'member_joined', description: 'Rahul Kumar joined as a new member', time: '10 minutes ago', icon: UserPlus, color: '#22C55E' },
  { id: 2, type: 'payment', description: 'Payment of ₹4,000 received from Priya Singh', time: '25 minutes ago', icon: CreditCard, color: '#3B82F6' },
  { id: 3, type: 'attendance', description: 'Amit Verma checked in at 7:30 AM', time: '1 hour ago', icon: CalendarCheck, color: '#F59E0B' },
  { id: 4, type: 'lead', description: 'New lead: Sneha Gupta — Instagram inquiry', time: '2 hours ago', icon: Target, color: '#8B5CF6' },
  { id: 5, type: 'membership', description: 'Ravi Shankar renewed Quarterly membership', time: '3 hours ago', icon: CreditCard, color: '#22C55E' },
  { id: 6, type: 'attendance', description: '85 members checked in today', time: '5 hours ago', icon: Activity, color: '#3B82F6' },
  { id: 7, type: 'payment', description: 'Payment of ₹12,000 received from Vikash Yadav', time: '6 hours ago', icon: CreditCard, color: '#3B82F6' },
];

const quickActions = [
  { label: 'Add Member', icon: UserPlus, href: '/admin/members', color: '#22C55E', bg: 'rgba(34,197,94,0.1)' },
  { label: 'Record Payment', icon: CreditCard, href: '/admin/payments', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
  { label: 'Mark Attendance', icon: CalendarCheck, href: '/admin/attendance', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
  { label: 'Create Lead', icon: Target, href: '/admin/leads', color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)' },
];

// --- Animated Counter ---
function AnimatedCounter({ target, isCurrency = false }: { target: number; isCurrency?: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return <span>{isCurrency ? formatCurrency(count) : count.toLocaleString('en-IN')}</span>;
}

// --- Custom Tooltip ---
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-3 shadow-xl">
      <p className="text-xs text-[#737373] mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-semibold text-white">
          {entry.name === 'revenue' ? formatCurrency(entry.value) : entry.value.toLocaleString('en-IN')}
        </p>
      ))}
    </div>
  );
}

// --- Container Animation ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function AdminDashboardPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            className="glass rounded-xl p-4 lg:p-5 card-hover"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: stat.bg }}
              >
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
              <div
                className={cn(
                  'flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full',
                  stat.trend === 'up'
                    ? 'text-[#22C55E] bg-[rgba(34,197,94,0.1)]'
                    : 'text-[#EF4444] bg-[rgba(239,68,68,0.1)]'
                )}
              >
                {stat.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {Math.abs(stat.change)}%
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
              <AnimatedCounter target={stat.value} isCurrency={stat.isCurrency} />
            </div>
            <p className="text-xs text-[#737373]">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Monthly Revenue */}
        <motion.div variants={itemVariants} className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-white">Monthly Revenue</h3>
              <p className="text-xs text-[#737373]">Revenue trend over the year</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#22C55E] font-medium">
              <TrendingUp size={14} />
              +18% vs last year
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#DC2626" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#DC2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="month" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#DC2626" strokeWidth={2} fill="url(#revenueGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* New Members Trend */}
        <motion.div variants={itemVariants} className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-white">New Members</h3>
              <p className="text-xs text-[#737373]">Monthly acquisition trend</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#22C55E] font-medium">
              <TrendingUp size={14} />
              +24% vs last year
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={newMembersData}>
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
        {/* Attendance Trends */}
        <motion.div variants={itemVariants} className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-white">Weekly Attendance</h3>
              <p className="text-xs text-[#737373]">This week&apos;s check-in pattern</p>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="day" stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#737373" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="count" stroke="#22C55E" strokeWidth={2} dot={{ fill: '#22C55E', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Membership Distribution */}
        <motion.div variants={itemVariants} className="glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-white">Membership Distribution</h3>
              <p className="text-xs text-[#737373]">Active members by plan type</p>
            </div>
          </div>
          <div className="h-[280px] flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={membershipDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {membershipDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload;
                    return (
                      <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-3 shadow-xl">
                        <p className="text-sm font-semibold text-white">{d.name}</p>
                        <p className="text-xs text-[#737373]">{d.value} members</p>
                      </div>
                    );
                  }}
                />
                <Legend
                  verticalAlign="middle"
                  align="right"
                  layout="vertical"
                  iconType="circle"
                  iconSize={8}
                  formatter={(value: string) => <span className="text-xs text-[#A3A3A3] ml-1">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="lg:col-span-2 glass rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-white">Recent Activity</h3>
            <button className="text-xs text-[#DC2626] hover:text-[#EF4444] transition-colors font-medium">
              View All
            </button>
          </div>
          <div className="space-y-1">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.02] transition-colors"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${activity.color}15` }}
                >
                  <activity.icon size={16} style={{ color: activity.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{activity.description}</p>
                  <p className="text-xs text-[#737373] flex items-center gap-1 mt-0.5">
                    <Clock size={10} />
                    {activity.time}
                  </p>
                </div>
                <ArrowUpRight size={14} className="text-[#737373] shrink-0" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="glass rounded-xl p-5">
          <h3 className="text-base font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/[0.02] border border-[#262626] hover:border-[#DC2626]/30 hover:bg-white/[0.04] transition-all group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: action.bg }}
                >
                  <action.icon size={20} style={{ color: action.color }} />
                </div>
                <span className="text-xs font-medium text-[#A3A3A3] group-hover:text-white transition-colors text-center">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
