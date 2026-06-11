'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { cn, formatDate, getInitials } from '@/lib/utils';
import {
  Search,
  Plus,
  Filter,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Download,
  UserPlus,
  X,
} from 'lucide-react';
import { AddMemberModal } from '@/features/admin/components/AddMemberModal';

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  ACTIVE: { bg: 'rgba(34,197,94,0.1)', text: '#22C55E', border: 'rgba(34,197,94,0.2)' },
  EXPIRED: { bg: 'rgba(239,68,68,0.1)', text: '#EF4444', border: 'rgba(239,68,68,0.2)' },
  FROZEN: { bg: 'rgba(59,130,246,0.1)', text: '#3B82F6', border: 'rgba(59,130,246,0.2)' },
  CANCELLED: { bg: 'rgba(115,115,115,0.1)', text: 'slate-400', border: 'rgba(115,115,115,0.2)' },
};

export default function MembersPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [genderFilter, setGenderFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const { data: membersData, isLoading } = useQuery({
    queryKey: ['members', searchQuery, statusFilter, genderFilter, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams({
        search: searchQuery,
        status: statusFilter === 'ALL' ? '' : statusFilter,
        page: currentPage.toString(),
        limit: perPage.toString(),
      });
      const res = await fetch(`/api/members?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch members');
      return res.json();
    },
  });

  const members = membersData?.data || [];
  const pagination = membersData?.pagination || { totalPages: 1, total: 0 };

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
          <h2 className="text-2xl font-bold text-white">Member Management</h2>
          <p className="text-sm text-[slate-400]">{pagination.total} members found</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[slate-800] border border-[slate-700333] text-sm text-[#A3A3A3] hover:text-white hover:border-[#DC2626]/30 transition-colors">
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-sm font-semibold text-white hover:shadow-lg hover:shadow-sky-500/20 transition-all"
          >
            <UserPlus size={16} />
            Add Member
          </button>
        </div>
      </div>

      <AddMemberModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Filters */}
      <div className="glass rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[slate-400]" />
            <input
              type="text"
              placeholder="Search by name, phone, or email..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-[slate-800] border border-[slate-700333] text-sm text-white placeholder-[slate-400] focus:outline-none focus:border-[#DC2626] transition-colors"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[slate-400] hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="h-10 px-3 rounded-lg bg-[slate-800] border border-[slate-700333] text-sm text-white focus:outline-none focus:border-[#DC2626] transition-colors appearance-none cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="EXPIRED">Expired</option>
              <option value="FROZEN">Frozen</option>
            </select>
            <select
              value={genderFilter}
              onChange={(e) => { setGenderFilter(e.target.value); setCurrentPage(1); }}
              className="h-10 px-3 rounded-lg bg-[slate-800] border border-[slate-700333] text-sm text-white focus:outline-none focus:border-[#DC2626] transition-colors appearance-none cursor-pointer"
            >
              <option value="ALL">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[slate-400] text-sm">Loading members...</p>
          </div>
        ) : members.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Phone</th>
                    <th className="hidden md:table-cell">Email</th>
                    <th>Status</th>
                    <th className="hidden lg:table-cell">Plan</th>
                    <th className="hidden sm:table-cell">Join Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m: any) => {
                    const activeMembership = m.memberships?.[0];
                    const status = activeMembership?.status || 'INACTIVE';
                    const sc = statusColors[status] || statusColors.CANCELLED;
                    return (
                      <tr key={m.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[slate-800] border border-[slate-700333] flex items-center justify-center shrink-0">
                              <span className="text-xs font-semibold text-[#A3A3A3]">{getInitials(m.user.name)}</span>
                            </div>
                            <span className="font-medium text-white whitespace-nowrap">{m.user.name}</span>
                          </div>
                        </td>
                        <td className="text-[#A3A3A3] whitespace-nowrap">{m.user.phone}</td>
                        <td className="hidden md:table-cell text-[#A3A3A3]">{m.user.email}</td>
                        <td>
                          <span
                            className="badge"
                            style={{ backgroundColor: sc.bg, color: sc.text, borderColor: sc.border, border: `1px solid ${sc.border}` }}
                          >
                            {status}
                          </span>
                        </td>
                        <td className="hidden lg:table-cell text-[#A3A3A3]">{activeMembership?.plan?.name || '-'}</td>
                        <td className="hidden sm:table-cell text-[#A3A3A3] whitespace-nowrap">{formatDate(m.createdAt)}</td>
                        <td>
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 rounded-lg text-[slate-400] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 transition-colors" title="View">
                              <Eye size={15} />
                            </button>
                            <button className="p-1.5 rounded-lg text-[slate-400] hover:text-[#F59E0B] hover:bg-[#F59E0B]/10 transition-colors" title="Edit">
                              <Pencil size={15} />
                            </button>
                            <button className="p-1.5 rounded-lg text-[slate-400] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors" title="Delete">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-[#262626]">
                <p className="text-xs text-[slate-400]">
                  Page {currentPage} of {pagination.totalPages}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg text-[slate-400] hover:text-white hover:bg-[slate-800] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                    disabled={currentPage === pagination.totalPages}
                    className="p-1.5 rounded-lg text-[slate-400] hover:text-white hover:bg-[slate-800] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-[slate-800] flex items-center justify-center mb-4">
              <Filter size={24} className="text-[slate-400]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">No members found</h3>
            <p className="text-sm text-[slate-400] mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => { setSearchQuery(''); setStatusFilter('ALL'); setGenderFilter('ALL'); }}
              className="px-4 py-2 rounded-lg bg-[slate-800] border border-[slate-700333] text-sm text-white hover:border-[#DC2626]/30 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
