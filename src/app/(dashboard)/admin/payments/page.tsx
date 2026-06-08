"use client";

import { useState } from "react";
import { formatCurrency, formatDate, getStatusColor } from "@/lib/utils";
import { Search, Filter, IndianRupee, TrendingUp } from "lucide-react";

const MOCK_PAYMENTS = [
  { id: "1", member: "Arjun Patel", amount: 4000, date: new Date(), method: "UPI", status: "COMPLETED", invoice: "VGM-1234" },
  { id: "2", member: "Neha Sharma", amount: 1500, date: new Date(Date.now() - 86400000), method: "CASH", status: "COMPLETED", invoice: "VGM-1235" },
  { id: "3", member: "Ravi Kumar", amount: 12000, date: new Date(Date.now() - 172800000), method: "CARD", status: "PENDING", invoice: "VGM-1236" },
];

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Payments</h1>
          <p className="text-sm text-gray-400">Manage transactions and revenues.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-500/10 p-3 rounded-full">
              <IndianRupee className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Revenue Today</p>
              <h3 className="text-2xl font-bold text-white">{formatCurrency(4000)}</h3>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">This Month</p>
              <h3 className="text-2xl font-bold text-white">{formatCurrency(45000)}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-xl p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search member or invoice..."
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
              {MOCK_PAYMENTS.map((payment) => (
                <tr key={payment.id}>
                  <td className="text-white font-mono text-xs">{payment.invoice}</td>
                  <td className="text-white">{payment.member}</td>
                  <td className="text-white font-medium">{formatCurrency(payment.amount)}</td>
                  <td className="text-gray-300">{formatDate(payment.date)}</td>
                  <td className="text-gray-300">{payment.method}</td>
                  <td>
                    <span className={`badge ${payment.status === "COMPLETED" ? "badge-active" : "badge-pending"}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td>
                    <button className="text-xs px-3 py-1 bg-blue-500/20 text-blue-500 rounded hover:bg-blue-500/30">
                      View
                    </button>
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
