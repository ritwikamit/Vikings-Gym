"use client";

import { Activity, Calendar, Trophy, Zap, ChevronRight, Bell } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default function MemberDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, Arjun!</h1>
          <p className="text-sm text-gray-400">Ready to crush your goals today?</p>
        </div>
        <button className="p-2 bg-[#1A1A1A] border border-[#333] rounded-full text-white hover:bg-[#222]">
          <Bell className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-xl p-6 md:col-span-2 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent z-0 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-red-500 font-bold tracking-wider uppercase">Active Plan</p>
                <h3 className="text-2xl font-bold text-white">Annual Membership</h3>
              </div>
              <span className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-xs font-medium">
                142 Days Left
              </span>
            </div>
            <div className="w-full bg-[#1A1A1A] rounded-full h-2 mb-2">
              <div className="bg-red-600 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-xs text-gray-400 mb-6">Expires on Oct 24, 2026</p>
            
            <Link href="/member/membership" className="inline-flex items-center text-sm text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition">
              Manage Membership <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        <div className="glass rounded-xl p-6 flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 bg-white rounded-xl mb-4 flex items-center justify-center p-2">
            {/* Placeholder for QR Code */}
            <div className="w-full h-full border-4 border-black border-dashed flex items-center justify-center bg-gray-100">
              <span className="text-black font-bold text-xs">QR CODE</span>
            </div>
          </div>
          <p className="text-sm text-white font-medium">Member ID: VGM-1234</p>
          <p className="text-xs text-gray-400">Scan at reception</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-full">
              <Activity className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Visits</p>
              <h3 className="text-2xl font-bold text-white">84</h3>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-orange-500/10 p-3 rounded-full">
              <Zap className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Current Streak</p>
              <h3 className="text-2xl font-bold text-white">4 Days</h3>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-full">
              <Trophy className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Current Weight</p>
              <h3 className="text-2xl font-bold text-white">75.2 kg</h3>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-500/10 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Next Assessment</p>
              <h3 className="text-xl font-bold text-white">In 5 Days</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Today's Workout</h3>
            <Link href="/member/workout" className="text-red-500 text-sm hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-[#1A1A1A] border border-[#333] rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-medium">Push Day (Chest, Shoulders, Triceps)</h4>
                <span className="text-xs text-gray-400">60 mins</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">Focus on progressive overload for bench press.</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 bg-[#222] rounded text-gray-300">Bench Press</span>
                <span className="text-xs px-2 py-1 bg-[#222] rounded text-gray-300">Incline DB Press</span>
                <span className="text-xs px-2 py-1 bg-[#222] rounded text-gray-300">Lateral Raises</span>
                <span className="text-xs px-2 py-1 bg-[#222] rounded text-gray-300">+4 more</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Recent Attendance</h3>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Gym Visit</p>
                    <p className="text-xs text-gray-400">{i === 1 ? "Today" : `${i} days ago`}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white">18:30 - 20:00</p>
                  <p className="text-xs text-gray-400">1h 30m</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
