'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Search,
  Filter,
  Users,
  Calendar,
  Target,
  TrendingUp,
  ChevronRight,
  Dumbbell,
} from 'lucide-react';

const mockClients = [
  {
    id: 1,
    name: 'Rahul Kumar',
    email: 'rahul@email.com',
    phone: '9876543210',
    membershipStatus: 'ACTIVE',
    fitnessGoal: 'Muscle Gain',
    joinDate: '2025-11-15',
    lastWorkout: '2026-06-07',
    progress: 75,
    weight: '78 kg',
    avatar: null,
  },
  {
    id: 2,
    name: 'Priya Singh',
    email: 'priya@email.com',
    phone: '9876543211',
    membershipStatus: 'ACTIVE',
    fitnessGoal: 'Weight Loss',
    joinDate: '2026-01-10',
    lastWorkout: '2026-06-08',
    progress: 60,
    weight: '64 kg',
    avatar: null,
  },
  {
    id: 3,
    name: 'Amit Verma',
    email: 'amit@email.com',
    phone: '9876543212',
    membershipStatus: 'ACTIVE',
    fitnessGoal: 'Body Building',
    joinDate: '2025-08-20',
    lastWorkout: '2026-06-06',
    progress: 85,
    weight: '82 kg',
    avatar: null,
  },
  {
    id: 4,
    name: 'Sneha Gupta',
    email: 'sneha@email.com',
    phone: '9876543213',
    membershipStatus: 'ACTIVE',
    fitnessGoal: 'General Fitness',
    joinDate: '2026-03-05',
    lastWorkout: '2026-06-07',
    progress: 45,
    weight: '58 kg',
    avatar: null,
  },
  {
    id: 5,
    name: 'Ravi Patel',
    email: 'ravi@email.com',
    phone: '9876543214',
    membershipStatus: 'EXPIRED',
    fitnessGoal: 'Strength Training',
    joinDate: '2025-06-01',
    lastWorkout: '2026-05-20',
    progress: 90,
    weight: '85 kg',
    avatar: null,
  },
  {
    id: 6,
    name: 'Neha Sharma',
    email: 'neha@email.com',
    phone: '9876543215',
    membershipStatus: 'ACTIVE',
    fitnessGoal: 'Weight Loss',
    joinDate: '2026-02-18',
    lastWorkout: '2026-06-08',
    progress: 55,
    weight: '70 kg',
    avatar: null,
  },
];

export default function TrainerClientsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || client.membershipStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-red-500" />
            My Clients
          </h1>
          <p className="text-[#A3A3A3] text-sm mt-1">
            Manage and track your assigned clients
          </p>
        </div>
        <div className="text-sm text-[#A3A3A3]">
          <span className="text-white font-semibold">{mockClients.length}</span> total clients
        </div>
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg pl-10 pr-4 py-2.5 text-white text-sm placeholder:text-[#737373] outline-none focus:border-red-500/50 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'ACTIVE', 'EXPIRED'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                'px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                statusFilter === status
                  ? 'bg-red-600/10 text-red-500 border border-red-500/30'
                  : 'bg-white/[0.04] text-[#A3A3A3] border border-white/[0.08] hover:bg-white/[0.06] hover:text-white'
              )}
            >
              {status === 'all' ? 'All' : status.charAt(0) + status.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Client Cards Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredClients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] transition-all duration-300 cursor-pointer group"
          >
            {/* Top Section */}
            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600/30 to-red-800/30 flex items-center justify-center text-red-500 font-bold text-sm flex-shrink-0 ring-1 ring-red-500/20">
                {getInitials(client.name)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm group-hover:text-red-400 transition-colors truncate">
                  {client.name}
                </h3>
                <p className="text-[#737373] text-xs truncate">{client.email}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span
                    className={cn(
                      'text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase',
                      client.membershipStatus === 'ACTIVE'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-red-500/10 text-red-500'
                    )}
                  >
                    {client.membershipStatus}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#737373] group-hover:text-white transition-colors flex-shrink-0 mt-1" />
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Target className="w-3.5 h-3.5 text-[#737373]" />
                <span className="text-xs text-[#A3A3A3] truncate">{client.fitnessGoal}</span>
              </div>
              <div className="flex items-center gap-2">
                <Dumbbell className="w-3.5 h-3.5 text-[#737373]" />
                <span className="text-xs text-[#A3A3A3]">{client.weight}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#737373]" />
                <span className="text-xs text-[#A3A3A3]">
                  Last: {new Date(client.lastWorkout).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-[#737373] flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Progress
                </span>
                <span className="text-xs font-semibold text-white">{client.progress}%</span>
              </div>
              <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${client.progress}%` }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                  className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
