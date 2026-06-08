'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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

// --- Mock Data ---
const mockMembers = [
  { id: '1', name: 'Rahul Kumar', phone: '+91 98765 43210', email: 'rahul.k@email.com', gender: 'Male', status: 'ACTIVE', joinDate: '2025-01-15', plan: 'Quarterly' },
  { id: '2', name: 'Priya Singh', phone: '+91 87654 32109', email: 'priya.s@email.com', gender: 'Female', status: 'ACTIVE', joinDate: '2025-02-20', plan: 'Annual' },
  { id: '3', name: 'Amit Verma', phone: '+91 76543 21098', email: 'amit.v@email.com', gender: 'Male', status: 'EXPIRED', joinDate: '2024-08-10', plan: 'Monthly' },
  { id: '4', name: 'Sneha Gupta', phone: '+91 65432 10987', email: 'sneha.g@email.com', gender: 'Female', status: 'ACTIVE', joinDate: '2025-03-05', plan: 'Half-Yearly' },
  { id: '5', name: 'Vikash Yadav', phone: '+91 54321 09876', email: 'vikash.y@email.com', gender: 'Male', status: 'FROZEN', joinDate: '2024-11-18', plan: 'Quarterly' },
  { id: '6', name: 'Anjali Kumari', phone: '+91 43210 98765', email: 'anjali.k@email.com', gender: 'Female', status: 'ACTIVE', joinDate: '2025-04-12', plan: 'Monthly' },
  { id: '7', name: 'Ravi Shankar', phone: '+91 32109 87654', email: 'ravi.s@email.com', gender: 'Male', status: 'ACTIVE', joinDate: '2024-06-22', plan: 'Annual' },
  { id: '8', name: 'Deepak Prasad', phone: '+91 21098 76543', email: 'deepak.p@email.com', gender: 'Male', status: 'EXPIRED', joinDate: '2024-09-30', plan: 'Monthly' },
  { id: '9', name: 'Kavita Devi', phone: '+91 10987 65432', email: 'kavita.d@email.com', gender: 'Female', status: 'ACTIVE', joinDate: '2025-05-01', plan: 'Quarterly' },
  { id: '10', name: 'Sunil Kumar', phone: '+91 99887 66554', email: 'sunil.k@email.com', gender: 'Male', status: 'ACTIVE', joinDate: '2025-05-20', plan: 'Half-Yearly' },
];

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  ACTIVE: { bg: 'rgba(34,197,94,0.1)', text: '#22C55E', border: 'rgba(34,197,94,0.2)' },
  EXPIRED: { bg: 'rgba(239,68,68,0.1)', text: '#EF4444', border: 'rgba(239,68,68,0.2)' },
  FROZEN: { bg: 'rgba(59,130,246,0.1)', text: '#3B82F6', border: 'rgba(59,130,246,0.2)' },
  CANCELLED: { bg: 'rgba(115,115,115,0.1)', text: '#737373', border: 'rgba(115,115,115,0.2)' },
};

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [genderFilter, setGenderFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const filtered = mockMembers.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || m.status === statusFilter;
    const matchGender = genderFilter === 'ALL' || m.gender === genderFilter;
    return matchSearch && matchStatus && matchGender;
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

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
          <p className="text-sm text-[#737373]">{filtered.length} members found</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1A1A1A] border border-[#333333] text-sm text-[#A3A3A3] hover:text-white hover:border-[#DC2626]/30 transition-colors">
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#DC2626] to-[#B91C1C] text-sm font-semibold text-white hover:shadow-lg hover:shadow-red-500/20 transition-all">
            <UserPlus size={16} />
            Add Member
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]" />
            <input
              type="text"
              placeholder="Search by name, phone, or email..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#1A1A1A] border border-[#333333] text-sm text-white placeholder-[#737373] focus:outline-none focus:border-[#DC2626] transition-colors"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="h-10 px-3 rounded-lg bg-[#1A1A1A] border border-[#333333] text-sm text-white focus:outline-none focus:border-[#DC2626] transition-colors appearance-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="EXPIRED">Expired</option>
            <option value="FROZEN">Frozen</option>
          </select>
          {/* Gender Filter */}
          <select
            value={genderFilter}
            onChange={(e) => { setGenderFilter(e.target.value); setCurrentPage(1); }}
            className="h-10 px-3 rounded-lg bg-[#1A1A1A] border border-[#333333] text-sm text-white focus:outline-none focus:border-[#DC2626] transition-colors appearance-none cursor-pointer"
          >
            <option value="ALL">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-xl overflow-hidden">
        {paginated.length > 0 ? (
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
                  {paginated.map((member) => {
                    const sc = statusColors[member.status] || statusColors.CANCELLED;
                    return (
                      <tr key={member.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#333333] flex items-center justify-center shrink-0">
                              <span className="text-xs font-semibold text-[#A3A3A3]">{getInitials(member.name)}</span>
                            </div>
                            <span className="font-medium text-white whitespace-nowrap">{member.name}</span>
                          </div>
                        </td>
                        <td className="text-[#A3A3A3] whitespace-nowrap">{member.phone}</td>
                        <td className="hidden md:table-cell text-[#A3A3A3]">{member.email}</td>
                        <td>
                          <span
                            className="badge"
                            style={{ backgroundColor: sc.bg, color: sc.text, borderColor: sc.border, border: `1px solid ${sc.border}` }}
                          >
                            {member.status}
                          </span>
                        </td>
                        <td className="hidden lg:table-cell text-[#A3A3A3]">{member.plan}</td>
                        <td className="hidden sm:table-cell text-[#A3A3A3] whitespace-nowrap">{formatDate(member.joinDate)}</td>
                        <td>
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 rounded-lg text-[#737373] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 transition-colors" title="View">
                              <Eye size={15} />
                            </button>
                            <button className="p-1.5 rounded-lg text-[#737373] hover:text-[#F59E0B] hover:bg-[#F59E0B]/10 transition-colors" title="Edit">
                              <Pencil size={15} />
                            </button>
                            <button className="p-1.5 rounded-lg text-[#737373] hover:text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors" title="Delete">
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
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-[#262626]">
                <p className="text-xs text-[#737373]">
                  Showing {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg text-[#737373] hover:text-white hover:bg-[#1A1A1A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        'w-8 h-8 rounded-lg text-xs font-medium transition-colors',
                        page === currentPage
                          ? 'bg-[#DC2626] text-white'
                          : 'text-[#737373] hover:text-white hover:bg-[#1A1A1A]'
                      )}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg text-[#737373] hover:text-white hover:bg-[#1A1A1A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
            <div className="w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center mb-4">
              <Filter size={24} className="text-[#737373]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">No members found</h3>
            <p className="text-sm text-[#737373] mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => { setSearchQuery(''); setStatusFilter('ALL'); setGenderFilter('ALL'); }}
              className="px-4 py-2 rounded-lg bg-[#1A1A1A] border border-[#333333] text-sm text-white hover:border-[#DC2626]/30 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
