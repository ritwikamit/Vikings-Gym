"use client";

import { CreditCard, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

const MEMBERSHIP = {
  plan: "Annual Membership",
  status: "ACTIVE",
  startDate: new Date("2025-10-24"),
  endDate: new Date("2026-10-24"),
  amount: 12000,
  features: ["Full Gym Access", "Personalized Workout Plan", "Weekly Diet Plan", "6 Personal Training Sessions"],
};

const HISTORY = [
  { id: "1", plan: "Annual Membership", amount: 12000, date: new Date("2025-10-24"), status: "PAID", invoice: "VGM-INV-001" },
  { id: "2", plan: "Monthly Membership", amount: 1500, date: new Date("2025-09-24"), status: "PAID", invoice: "VGM-INV-002" },
];

export default function MemberMembershipPage() {
  const daysLeft = Math.ceil((MEMBERSHIP.endDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
  const progress = 100 - (daysLeft / 365) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Membership Details</h1>
          <p className="text-sm text-slate-400">Manage your subscription and billing.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass rounded-xl p-6 lg:col-span-2 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-600/20 to-black z-0 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">{MEMBERSHIP.plan}</h2>
                <div className="flex items-center gap-2">
                  <span className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-xs font-medium border border-green-500/20">Active</span>
                  <span className="text-sm text-slate-400">Since {formatDate(MEMBERSHIP.startDate)}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-white">{formatCurrency(MEMBERSHIP.amount)}</p>
                <p className="text-xs text-slate-400">per year</p>
              </div>
            </div>

            <div className="mb-6 flex-1">
              <h3 className="text-sm font-semibold text-slate-400 mb-3">Included Benefits:</h3>
              <ul className="space-y-2">
                {MEMBERSHIP.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-sky-500" /> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[slate-800] border border-[slate-700] p-4 rounded-lg mt-auto">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Current Period</span>
                <span className="text-white font-medium">{daysLeft} days remaining</span>
              </div>
              <div className="w-full bg-[slate-800] rounded-full h-2 mb-2">
                <div className="bg-sky-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>{formatDate(MEMBERSHIP.startDate)}</span>
                <span>{formatDate(MEMBERSHIP.endDate)}</span>
              </div>
            </div>
            
            <div className="mt-6 flex gap-4">
              <button className="px-6 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 transition">
                Renew Now
              </button>
              <button className="px-6 py-2 bg-[slate-800] border border-[slate-700] text-white rounded-lg text-sm font-medium hover:bg-[slate-800] transition">
                Change Plan
              </button>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Payment Method</h3>
          <div className="bg-[slate-800] border border-[slate-700] rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">UPI Autopay</p>
                  <p className="text-xs text-slate-500">Ends in ****1234</p>
                </div>
              </div>
            </div>
            <button className="w-full py-2 text-sm text-sky-500 hover:bg-sky-500/10 rounded transition">
              Update Payment Method
            </button>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0" />
            <div>
              <p className="text-sm font-medium text-yellow-500 mb-1">Auto-Renewal Active</p>
              <p className="text-xs text-yellow-500/80">Your membership will automatically renew on {formatDate(MEMBERSHIP.endDate)}.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">Billing History</h3>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Plan</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {HISTORY.map((record) => (
                <tr key={record.id}>
                  <td className="text-white font-mono text-xs">{record.invoice}</td>
                  <td className="text-white">{record.plan}</td>
                  <td className="text-gray-300">{formatDate(record.date)}</td>
                  <td className="text-white font-medium">{formatCurrency(record.amount)}</td>
                  <td>
                    <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-medium">
                      {record.status}
                    </span>
                  </td>
                  <td>
                    <button className="text-xs text-blue-500 hover:underline">Download PDF</button>
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
