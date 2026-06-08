"use client";

import { useState } from "react";
import { Search, Filter, Plus, Target, User, Phone, CheckCircle, XCircle } from "lucide-react";

const STAGES = ["New Lead", "Contacted", "Trial Scheduled", "Trial Completed", "Converted", "Lost"];

const MOCK_LEADS = [
  { id: "1", name: "Rohit Sharma", phone: "9876543100", stage: "New Lead", source: "Walk-in" },
  { id: "2", name: "Sunita Devi", phone: "9876543101", stage: "Contacted", source: "Instagram" },
  { id: "3", name: "Manish Tiwari", phone: "9876543102", stage: "Trial Scheduled", source: "Referral" },
];

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Leads CRM</h1>
          <p className="text-sm text-gray-400">Manage potential members and inquiries.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition">
          <Plus className="w-4 h-4" /> Add Lead
        </button>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-4">
        {STAGES.map((stage) => (
          <div key={stage} className="min-w-[280px] bg-[#141414] border border-[#262626] rounded-xl flex flex-col max-h-[80vh]">
            <div className="p-3 border-b border-[#262626] flex justify-between items-center bg-[#1A1A1A] rounded-t-xl">
              <h3 className="font-semibold text-white text-sm uppercase tracking-wide">{stage}</h3>
              <span className="bg-[#333] text-xs px-2 py-0.5 rounded-full text-white">
                {MOCK_LEADS.filter((l) => l.stage === stage).length}
              </span>
            </div>
            <div className="p-3 flex-1 overflow-y-auto space-y-3">
              {MOCK_LEADS.filter((l) => l.stage === stage).map((lead) => (
                <div key={lead.id} className="bg-[#1A1A1A] border border-[#333] p-3 rounded-lg hover:border-red-500/50 transition cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-white">{lead.name}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                    <Phone className="w-3 h-3" /> {lead.phone}
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#333]">
                    <span className="text-[10px] uppercase tracking-wider text-gray-500">{lead.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
