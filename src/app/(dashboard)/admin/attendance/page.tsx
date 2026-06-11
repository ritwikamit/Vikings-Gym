"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import { CalendarCheck, Search, Filter, Camera, CheckCircle, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { QRScannerModal } from "@/features/admin/components/QRScannerModal";

export default function AttendancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const perPage = 20;

  const { data: attendanceData, isLoading } = useQuery({
    queryKey: ['attendance', searchTerm, currentPage],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: perPage.toString(),
      });
      // Note: Backend might not support search yet, but we'll include it if it does
      const res = await fetch(`/api/attendance?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch attendance');
      return res.json();
    },
  });

  const records = attendanceData?.data || [];
  const pagination = attendanceData?.pagination || { totalPages: 1, total: 0 };

  // Filter local if backend doesn't support search
  const filteredRecords = records.filter((r: any) => 
    r.member.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Attendance</h1>
          <p className="text-sm text-slate-400">Track member check-ins and check-outs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Check-ins</p>
              <h3 className="text-2xl font-bold text-white">{pagination.total}</h3>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-full">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Records (Current Page)</p>
              <h3 className="text-2xl font-bold text-white">{records.length}</h3>
            </div>
          </div>
        </div>
        <div 
          onClick={() => setIsScannerOpen(true)}
          className="glass rounded-xl p-6 flex flex-col justify-center items-center gap-2 cursor-pointer hover:bg-white/5 transition border-dashed border-2 border-white/10 hover:border-sky-500/50"
        >
          <Camera className="w-8 h-8 text-sky-500" />
          <span className="text-white font-medium">Scan QR Code</span>
        </div>
      </div>

      <QRScannerModal isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />

      <div className="glass rounded-xl p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search member..."
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
              <p className="text-[slate-400] text-sm">Loading attendance...</p>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Method</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-500">No attendance records found.</td>
                  </tr>
                ) : (
                  filteredRecords.map((record: any) => (
                    <tr key={record.id}>
                      <td className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-500 flex items-center justify-center font-medium text-xs">
                          {record.member.user.avatar || record.member.user.name.charAt(0)}
                        </div>
                        <span className="text-white">{record.member.user.name}</span>
                      </td>
                      <td className="text-gray-300">{formatDate(record.date)}</td>
                      <td className="text-gray-300">{new Date(record.checkIn).toLocaleTimeString()}</td>
                      <td className="text-gray-300">{record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : "-"}</td>
                      <td className="text-gray-300 text-xs font-mono">{record.method}</td>
                      <td>
                        {!record.checkOut && (
                          <button className="text-xs px-3 py-1 bg-sky-500/20 text-sky-500 rounded hover:bg-sky-500/30 transition-colors">
                            Check Out
                          </button>
                        )}
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
