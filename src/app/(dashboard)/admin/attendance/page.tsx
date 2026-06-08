"use client";

import { useState } from "react";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import { CalendarCheck, Search, Filter, Camera, CheckCircle, Clock } from "lucide-react";

const MOCK_ATTENDANCE = [
  { id: "1", member: { name: "Arjun Patel", avatar: "AP" }, checkIn: new Date(), checkOut: null, method: "QR_CODE" },
  { id: "2", member: { name: "Neha Sharma", avatar: "NS" }, checkIn: new Date(Date.now() - 3600000), checkOut: new Date(), method: "MANUAL" },
  { id: "3", member: { name: "Ravi Kumar", avatar: "RK" }, checkIn: new Date(Date.now() - 7200000), checkOut: null, method: "QR_CODE" },
];

export default function AttendancePage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Attendance</h1>
          <p className="text-sm text-gray-400">Track member check-ins and check-outs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Check-ins</p>
              <h3 className="text-2xl font-bold text-white">42</h3>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-full">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Currently In</p>
              <h3 className="text-2xl font-bold text-white">15</h3>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-6 flex flex-col justify-center items-center gap-2 cursor-pointer hover:bg-white/5 transition">
          <Camera className="w-8 h-8 text-red-500" />
          <span className="text-white font-medium">Scan QR Code</span>
        </div>
      </div>

      <div className="glass rounded-xl p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search member..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-sm text-white hover:bg-[#222]">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Method</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ATTENDANCE.map((record) => (
                <tr key={record.id}>
                  <td className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center font-medium text-xs">
                      {record.member.avatar}
                    </div>
                    <span className="text-white">{record.member.name}</span>
                  </td>
                  <td className="text-gray-300">{record.checkIn.toLocaleTimeString()}</td>
                  <td className="text-gray-300">{record.checkOut ? record.checkOut.toLocaleTimeString() : "-"}</td>
                  <td className="text-gray-300">{record.method}</td>
                  <td>
                    {!record.checkOut && (
                      <button className="text-xs px-3 py-1 bg-red-500/20 text-red-500 rounded hover:bg-red-500/30">
                        Check Out
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
