'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn, formatCurrency, formatDate } from '@/lib/utils';
import {
  CreditCard,
  Plus,
  Pencil,
  Trash2,
  AlertTriangle,
  Clock,
  CheckCircle,
  Eye,
} from 'lucide-react';

// --- Mock Data ---
const plans = [
  { id: '1', name: 'Monthly', duration: 1, price: 1500, members: 65, status: 'Active' },
  { id: '2', name: 'Quarterly', duration: 3, price: 4000, members: 85, status: 'Active' },
  { id: '3', name: 'Half-Yearly', duration: 6, price: 7000, members: 52, status: 'Active' },
  { id: '4', name: 'Annual', duration: 12, price: 12000, members: 46, status: 'Active' },
  { id: '5', name: 'Personal Training – Monthly', duration: 1, price: 5000, members: 18, status: 'Active' },
];

const activeMemberships = [
  { id: '1', member: 'Rahul Kumar', plan: 'Quarterly', startDate: '2025-04-15', endDate: '2025-07-15', status: 'ACTIVE', amountPaid: 4000 },
  { id: '2', member: 'Priya Singh', plan: 'Annual', startDate: '2025-02-20', endDate: '2026-02-20', status: 'ACTIVE', amountPaid: 12000 },
  { id: '3', member: 'Amit Verma', plan: 'Monthly', startDate: '2025-05-01', endDate: '2025-06-01', status: 'ACTIVE', amountPaid: 1500 },
  { id: '4', member: 'Sneha Gupta', plan: 'Half-Yearly', startDate: '2025-03-05', endDate: '2025-09-05', status: 'ACTIVE', amountPaid: 7000 },
  { id: '5', member: 'Vikash Yadav', plan: 'Quarterly', startDate: '2025-01-18', endDate: '2025-04-18', status: 'EXPIRED', amountPaid: 4000 },
  { id: '6', member: 'Anjali Kumari', plan: 'Monthly', startDate: '2025-05-12', endDate: '2025-06-12', status: 'ACTIVE', amountPaid: 1500 },
  { id: '7', member: 'Ravi Shankar', plan: 'Annual', startDate: '2024-06-22', endDate: '2025-06-22', status: 'ACTIVE', amountPaid: 12000 },
  { id: '8', member: 'Kavita Devi', plan: 'Quarterly', startDate: '2025-05-01', endDate: '2025-08-01', status: 'ACTIVE', amountPaid: 4000 },
];

const expiringSoon = [
  { id: '1', member: 'Amit Verma', plan: 'Monthly', endDate: '2025-06-10', daysLeft: 2, phone: '+91 76543 21098' },
  { id: '2', member: 'Anjali Kumari', plan: 'Monthly', endDate: '2025-06-12', daysLeft: 4, phone: '+91 43210 98765' },
  { id: '3', member: 'Ravi Shankar', plan: 'Annual', endDate: '2025-06-15', daysLeft: 7, phone: '+91 32109 87654' },
  { id: '4', member: 'Deepak Prasad', plan: 'Monthly', endDate: '2025-06-14', daysLeft: 6, phone: '+91 21098 76543' },
];

const tabs = ['Plans', 'Active Memberships', 'Expiring Soon'] as const;

export default function MembershipsPage() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Plans');

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Memberships</h2>
          <p className="text-sm text-[slate-400]">Manage plans, memberships, and renewals</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-sm font-semibold text-white hover:shadow-lg hover:shadow-sky-500/20 transition-all w-fit">
          <Plus size={16} />
          Add Plan
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-[#111111] rounded-lg border border-[#262626] w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-2 rounded-md text-sm font-medium transition-all',
              activeTab === tab
                ? 'bg-[#DC2626] text-white shadow-lg shadow-sky-500/20'
                : 'text-[slate-400] hover:text-white hover:bg-[slate-800]'
            )}
          >
            {tab}
            {tab === 'Expiring Soon' && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] text-[10px] font-bold">
                {expiringSoon.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Plans Tab */}
      {activeTab === 'Plans' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-xl p-5 card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#DC2626]/10 flex items-center justify-center">
                  <CreditCard size={20} className="text-[#DC2626]" />
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg text-[slate-400] hover:text-[#F59E0B] hover:bg-[#F59E0B]/10 transition-colors">
                    <Pencil size={14} />
                  </button>
                  <button className="p-1.5 rounded-lg text-[slate-400] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
              <p className="text-2xl font-bold text-white mb-1">
                {formatCurrency(plan.price)}
                <span className="text-sm font-normal text-[slate-400]">
                  /{plan.duration === 1 ? 'mo' : `${plan.duration}mo`}
                </span>
              </p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#262626]">
                <span className="text-xs text-[slate-400]">{plan.members} active members</span>
                <span className="badge badge-active text-[10px]">{plan.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Active Memberships Tab */}
      {activeTab === 'Active Memberships' && (
        <div className="glass rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Plan</th>
                  <th className="hidden sm:table-cell">Start Date</th>
                  <th>End Date</th>
                  <th className="hidden md:table-cell">Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeMemberships.map((m) => (
                  <tr key={m.id}>
                    <td className="font-medium text-white whitespace-nowrap">{m.member}</td>
                    <td className="text-[#A3A3A3]">{m.plan}</td>
                    <td className="hidden sm:table-cell text-[#A3A3A3] whitespace-nowrap">{formatDate(m.startDate)}</td>
                    <td className="text-[#A3A3A3] whitespace-nowrap">{formatDate(m.endDate)}</td>
                    <td className="hidden md:table-cell text-[#A3A3A3]">{formatCurrency(m.amountPaid)}</td>
                    <td>
                      <span className={cn('badge', m.status === 'ACTIVE' ? 'badge-active' : 'badge-expired')}>
                        {m.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg text-[slate-400] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 transition-colors">
                          <Eye size={15} />
                        </button>
                        <button className="p-1.5 rounded-lg text-[slate-400] hover:text-[#F59E0B] hover:bg-[#F59E0B]/10 transition-colors">
                          <Pencil size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Expiring Soon Tab */}
      {activeTab === 'Expiring Soon' && (
        <div className="space-y-3">
          {expiringSoon.length === 0 ? (
            <div className="glass rounded-xl p-12 flex flex-col items-center justify-center">
              <CheckCircle size={40} className="text-[#22C55E] mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">All Clear!</h3>
              <p className="text-sm text-[slate-400]">No memberships expiring within 7 days.</p>
            </div>
          ) : (
            expiringSoon.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-l-4 border-[#F59E0B]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center shrink-0">
                    <AlertTriangle size={18} className="text-[#F59E0B]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{m.member}</p>
                    <p className="text-xs text-[slate-400]">{m.plan} · Expires {formatDate(m.endDate)}</p>
                    <p className="text-xs text-[slate-400]">{m.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] text-xs font-bold flex items-center gap-1">
                    <Clock size={12} />
                    {m.daysLeft} days left
                  </span>
                  <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-xs font-semibold text-white hover:shadow-lg hover:shadow-sky-500/20 transition-all">
                    Renew
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
}
