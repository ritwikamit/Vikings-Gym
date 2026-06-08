'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
import StatsCard from '@/components/dashboard/StatsCard';
import {
  Users,
  Dumbbell,
  Apple,
  CalendarCheck,
  Clock,
  Plus,
  ArrowRight,
  CheckCircle2,
  Activity,
} from 'lucide-react';

const stats = [
  { title: 'Total Clients', value: 18, change: 12, changeLabel: 'this month', icon: Users, variant: 'blue' as const },
  { title: 'Workout Plans', value: 24, change: 8, changeLabel: 'this month', icon: Dumbbell, variant: 'red' as const },
  { title: 'Diet Plans', value: 15, change: 5, changeLabel: 'this month', icon: Apple, variant: 'green' as const },
  { title: "Today's Sessions", value: 5, icon: CalendarCheck, variant: 'yellow' as const },
];

const todaySchedule = [
  { id: 1, time: '7:00 AM', client: 'Rahul Kumar', type: 'Strength Training', status: 'completed' },
  { id: 2, time: '8:30 AM', client: 'Priya Singh', type: 'Weight Loss Cardio', status: 'completed' },
  { id: 3, time: '10:00 AM', client: 'Amit Verma', type: 'Muscle Building', status: 'in-progress' },
  { id: 4, time: '4:00 PM', client: 'Sneha Gupta', type: 'Functional Training', status: 'upcoming' },
  { id: 5, time: '6:00 PM', client: 'Ravi Patel', type: 'Bodybuilding', status: 'upcoming' },
];

const recentActivity = [
  { id: 1, client: 'Rahul Kumar', action: 'completed workout', time: '2 hours ago', icon: CheckCircle2 },
  { id: 2, client: 'Priya Singh', action: 'logged weight: 62 kg', time: '3 hours ago', icon: Activity },
  { id: 3, client: 'Amit Verma', action: 'started new diet plan', time: '5 hours ago', icon: Apple },
  { id: 4, client: 'Sneha Gupta', action: 'missed session yesterday', time: '1 day ago', icon: CalendarCheck },
];

export default function TrainerDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-red-600/10 via-red-600/5 to-transparent border border-red-500/10 rounded-2xl p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
              Welcome back, Vikram 💪
            </h1>
            <p className="text-[#A3A3A3] text-sm">
              You have <span className="text-red-500 font-semibold">5 sessions</span> scheduled today. Keep up the great work!
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all shadow-lg shadow-red-600/20">
              <Plus className="w-4 h-4" />
              Create Workout
            </button>
            <button className="flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-all">
              <Apple className="w-4 h-4" />
              Create Diet Plan
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} index={index} />
        ))}
      </div>

      {/* Two-Column Layout */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-3 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl"
        >
          <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-500" />
              Today&apos;s Schedule
            </h2>
            <span className="text-xs text-[#737373]">{formatDate(new Date())}</span>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {todaySchedule.map((session) => (
              <div
                key={session.id}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
              >
                <div className="text-sm font-medium text-[#A3A3A3] w-20 flex-shrink-0">
                  {session.time}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {session.client}
                  </p>
                  <p className="text-xs text-[#737373]">{session.type}</p>
                </div>
                <span
                  className={cn(
                    'text-xs font-semibold px-2.5 py-1 rounded-full capitalize',
                    session.status === 'completed' && 'bg-green-500/10 text-green-500',
                    session.status === 'in-progress' && 'bg-yellow-500/10 text-yellow-500',
                    session.status === 'upcoming' && 'bg-blue-500/10 text-blue-500'
                  )}
                >
                  {session.status.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl"
        >
          <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-red-500" />
              Recent Activity
            </h2>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {recentActivity.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-[#A3A3A3]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">
                      <span className="font-medium">{item.client}</span>{' '}
                      <span className="text-[#A3A3A3]">{item.action}</span>
                    </p>
                    <p className="text-xs text-[#737373] mt-0.5">{item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
