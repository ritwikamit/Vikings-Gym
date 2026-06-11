"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import { Search, Filter, IndianRupee, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { RecordPaymentModal } from "@/features/admin/components/RecordPaymentModal";

export default function PaymentsPage() {
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  const { data: paymentsData, isLoading } = useQuery({
    queryKey: ['payments', currentPage],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: perPage.toString(),
      });
      const res = await fetch(`/api/payments?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch payments');
      return res.json();
    },
  });

  const payments = paymentsData?.data || [];
  const totalRevenue = paymentsData?.totalRevenue || 0;
  const pagination = paymentsData?.pagination || { totalPages: 1, total: 0 };

  const filteredPayments = payments.filter((p: any) => 
    p.member.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Payments</h1>
          <p className="text-sm text-slate-400">Manage transactions and revenues.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsRecordModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#10B981] to-[#059669] text-sm font-semibold text-white hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
          >
            <IndianRupee size={16} />
            Record Payment
          </button>
        </div>
      </div>

      <RecordPaymentModal isOpen={isRecordModalOpen} onClose={() => setIsRecordModalOpen(false)} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-500/10 p-3 rounded-full">
              <IndianRupee className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Transactions</p>
              <h3 className="text-2xl font-bold text-white">{pagination.total}</h3>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Revenue (All Time)</p>
              <h3 className="text-2xl font-bold text-white">{formatCurrency(totalRevenue)}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-xl p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search member or invoice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[slate-800] border border-[slate-700] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[slate-800] border border-[slate-700] rounded-lg text-sm text-white hover:bg-[slate-800]">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-[slate-400] text-sm">Loading payments...</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Member</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-slate-500">No payments found.</td>
                  </tr>
                ) : (
                  filteredPayments.map((payment: any) => (
                    <tr key={payment.id}>
                      <td className="text-white font-mono text-xs">{payment.invoiceNumber}</td>
                      <td className="text-white">{payment.member.user.name}</td>
                      <td className="text-white font-medium">{formatCurrency(payment.amount)}</td>
                      <td className="text-gray-300">{formatDate(payment.createdAt)}</td>
                      <td className="text-gray-300">{payment.method}</td>
                      <td>
                        <span className={`badge ${payment.status === "PAID" || payment.status === "COMPLETED" ? "badge-active" : "badge-pending"}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td>
                        <button className="text-xs px-3 py-1 bg-blue-500/20 text-blue-500 rounded hover:bg-blue-500/30 transition-colors">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 px-2">
            <p className="text-xs text-[slate-400]">
              Page {currentPage} of {pagination.totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="p-2 rounded-lg bg-[slate-800] border border-[slate-700333] text-[slate-400] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                disabled={currentPage === pagination.totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="p-2 rounded-lg bg-[slate-800] border border-[slate-700333] text-[slate-400] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
