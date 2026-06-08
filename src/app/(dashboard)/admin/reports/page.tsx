"use client";

import { useState } from "react";
import { BarChart3, Users, IndianRupee, Dumbbell, Download } from "lucide-react";

const REPORT_CARDS = [
  { id: "revenue", title: "Revenue Report", description: "Detailed breakdown of income, payments, and subscriptions.", icon: IndianRupee, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { id: "attendance", title: "Attendance Report", description: "Member check-ins, peak hours, and facility usage trends.", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "membership", title: "Membership Report", description: "Active, expired, and frozen memberships analysis.", icon: BarChart3, color: "text-green-500", bg: "bg-green-500/10" },
  { id: "trainer", title: "Trainer Performance", description: "Client distribution, sessions completed, and trainer ratings.", icon: Dumbbell, color: "text-red-500", bg: "bg-red-500/10" },
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("this-month");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-sm text-gray-400">Generate and export analytics data.</p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-[#1A1A1A] border border-[#333] rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
          >
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="this-year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REPORT_CARDS.map((report) => (
          <div key={report.id} className="glass rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`${report.bg} p-4 rounded-xl`}>
                <report.icon className={`w-8 h-8 ${report.color}`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">{report.title}</h3>
                <p className="text-sm text-gray-400">{report.description}</p>
              </div>
            </div>
            <div className="flex sm:flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition">
                Generate
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#1A1A1A] border border-[#333] text-white rounded-lg text-sm font-medium hover:bg-[#222] transition">
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
