"use client";

import { User, Mail, Phone, MapPin, Calendar, Activity, Scale, Info } from "lucide-react";

export default function MemberProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">My Profile</h1>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition">
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Info */}
        <div className="glass rounded-xl p-6 lg:col-span-2 space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-3xl font-bold border-4 border-[#1A1A1A]">
              AP
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Arjun Patel</h2>
              <p className="text-gray-400">arjun@email.com</p>
              <div className="flex gap-2 mt-2">
                <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded text-xs font-medium">Active Member</span>
                <span className="bg-[#1A1A1A] border border-[#333] text-gray-300 px-2 py-1 rounded text-xs font-medium">Joined Jan 2026</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 border-b border-[#333] pb-2">Personal Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm text-white">+91 98765 43001</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-sm text-white">MG Road, Aurangabad, Bihar</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Date of Birth</p>
                    <p className="text-sm text-white">May 15, 1995</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 border-b border-[#333] pb-2">Emergency Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="text-sm text-white">Rahul Patel</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm text-white">+91 98765 43000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Physical Stats Info */}
        <div className="glass rounded-xl p-6 space-y-6">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider border-b border-[#333] pb-2">Physical Stats</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1A1A1A] border border-[#333] p-4 rounded-lg text-center">
              <Scale className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Weight</p>
              <p className="text-lg font-bold text-white">75 kg</p>
            </div>
            <div className="bg-[#1A1A1A] border border-[#333] p-4 rounded-lg text-center">
              <Activity className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Height</p>
              <p className="text-lg font-bold text-white">175 cm</p>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-[#333] p-4 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">BMI</p>
            <div className="flex items-end gap-2 mb-2">
              <p className="text-2xl font-bold text-white">24.5</p>
              <span className="text-sm text-green-500 mb-1">Normal</span>
            </div>
            <div className="w-full bg-[#222] rounded-full h-1.5 mt-2">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-[#333] p-4 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Fitness Goal</p>
            <p className="text-sm font-medium text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-red-500" /> Muscle Gain
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Target(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}
