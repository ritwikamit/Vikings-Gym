"use client";

import { Users, FileText, Calendar, Plus, CheckCircle } from "lucide-react";

export default function TrainerDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome, Coach!</h1>
          <p className="text-sm text-gray-400">Here's your summary for today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Clients</p>
              <h3 className="text-2xl font-bold text-white">12</h3>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-500/10 p-3 rounded-full">
              <FileText className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Plans</p>
              <h3 className="text-2xl font-bold text-white">24</h3>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-500/10 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Sessions Done</p>
              <h3 className="text-2xl font-bold text-white">156</h3>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-500/10 p-3 rounded-full">
              <Calendar className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Today's Sessions</p>
              <h3 className="text-2xl font-bold text-white">4</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Today's Schedule</h3>
          <div className="space-y-4">
            {[
              { time: "07:00 AM", client: "Arjun Patel", type: "Personal Training" },
              { time: "09:00 AM", client: "Neha Sharma", type: "Assessment" },
              { time: "05:00 PM", client: "Ravi Kumar", type: "Personal Training" },
              { time: "06:30 PM", client: "Vikram Singh", type: "Consultation" },
            ].map((session, i) => (
              <div key={i} className="bg-[#1A1A1A] border border-[#333] p-4 rounded-lg flex items-center justify-between hover:border-red-500/50 transition">
                <div className="flex items-center gap-4">
                  <div className="bg-[#222] px-3 py-2 rounded text-sm font-medium text-white">
                    {session.time}
                  </div>
                  <div>
                    <p className="text-white font-medium">{session.client}</p>
                    <p className="text-xs text-gray-400">{session.type}</p>
                  </div>
                </div>
                <button className="text-xs text-red-500 hover:underline">View</button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-[#1A1A1A] border border-[#333] hover:border-red-500 hover:bg-red-500/5 p-6 rounded-xl flex flex-col items-center justify-center gap-3 transition">
              <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
              <span className="text-white font-medium text-sm">Create Workout</span>
            </button>
            <button className="bg-[#1A1A1A] border border-[#333] hover:border-green-500 hover:bg-green-500/5 p-6 rounded-xl flex flex-col items-center justify-center gap-3 transition">
              <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6" />
              </div>
              <span className="text-white font-medium text-sm">Create Diet Plan</span>
            </button>
            <button className="bg-[#1A1A1A] border border-[#333] hover:border-blue-500 hover:bg-blue-500/5 p-6 rounded-xl flex flex-col items-center justify-center gap-3 transition">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <span className="text-white font-medium text-sm">Schedule Session</span>
            </button>
            <button className="bg-[#1A1A1A] border border-[#333] hover:border-purple-500 hover:bg-purple-500/5 p-6 rounded-xl flex flex-col items-center justify-center gap-3 transition">
              <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-white font-medium text-sm">Log Assessment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
