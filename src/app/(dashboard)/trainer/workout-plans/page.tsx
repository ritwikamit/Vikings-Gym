"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Plus, Dumbbell, Calendar, FileText, ChevronLeft, ChevronRight } from "lucide-react";

export default function WorkoutPlansPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: plansData, isLoading } = useQuery({
    queryKey: ['workout-plans'],
    queryFn: async () => {
      // In a real app, this would be an API endpoint
      // const res = await fetch('/api/workout-plans');
      // return res.json();
      return { data: [] }; // Mock empty for now
    },
  });

  const plans = plansData?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Workout Plans</h1>
          <p className="text-sm text-gray-400">Design and assign training regimens.</p>
        </div>
        <button 
          className="flex items-center gap-2 px-4 py-2 bg-[#C62828] hover:bg-[#A32020] text-white rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus size={16} /> Create Plan
        </button>
      </div>

      <div className="glass rounded-xl p-6 min-h-[400px]">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search plans..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#DC2626] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-[#737373] text-sm">Loading plans...</p>
          </div>
        ) : plans.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Dumbbell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Plans Yet</h3>
            <p className="text-gray-400 max-w-sm mb-6">You haven't created any workout plans yet. Start building your first program.</p>
            <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-colors">
              Create First Plan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Grid of plans would go here */}
          </div>
        )}
      </div>
    </div>
  );
}
