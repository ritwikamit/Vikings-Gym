"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Users, Search, Plus, Star, Dumbbell, Award, CreditCard } from "lucide-react";

const MOCK_TRAINERS = [
  { id: "1", name: "Rahul Singh", specialization: "Strength & Conditioning", experience: "5 Years", rating: 4.8, clients: 12, salary: 25000 },
  { id: "2", name: "Amit Verma", specialization: "CrossFit", experience: "3 Years", rating: 4.6, clients: 8, salary: 20000 },
  { id: "3", name: "Sneha Gupta", specialization: "Yoga & Rehab", experience: "4 Years", rating: 4.9, clients: 15, salary: 22000 },
  { id: "4", name: "Vikash Kumar", specialization: "Sports Performance", experience: "6 Years", rating: 4.7, clients: 10, salary: 28000 },
];

export default function AdminTrainersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Trainers</h1>
          <p className="text-sm text-gray-400">Manage your coaching staff.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition">
          <Plus className="w-4 h-4" /> Add Trainer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500/10 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Trainers</p>
              <h3 className="text-2xl font-bold text-white">{MOCK_TRAINERS.length}</h3>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-500/10 p-3 rounded-full">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg Rating</p>
              <h3 className="text-2xl font-bold text-white">4.7</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full sm:w-64 mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search trainers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#1A1A1A] border border-[#333] rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-red-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_TRAINERS.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase())).map((trainer) => (
          <div key={trainer.id} className="glass rounded-xl overflow-hidden flex flex-col">
            <div className="h-32 bg-[#1A1A1A] relative flex items-center justify-center border-b border-[#333]">
               <div className="w-20 h-20 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-xl font-bold absolute -bottom-10 border-4 border-[#111]">
                 {trainer.name.split(" ").map(n => n[0]).join("")}
               </div>
            </div>
            <div className="pt-12 p-6 text-center flex-1">
              <h3 className="text-lg font-bold text-white">{trainer.name}</h3>
              <p className="text-red-500 text-sm font-medium mb-4">{trainer.specialization}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4 text-left">
                <div>
                  <p className="text-xs text-gray-500 flex items-center gap-1"><Award className="w-3 h-3"/> Experience</p>
                  <p className="text-sm text-white font-medium">{trainer.experience}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 flex items-center gap-1"><Users className="w-3 h-3"/> Clients</p>
                  <p className="text-sm text-white font-medium">{trainer.clients}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 flex items-center gap-1"><Star className="w-3 h-3"/> Rating</p>
                  <p className="text-sm text-white font-medium">{trainer.rating} / 5.0</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 flex items-center gap-1"><CreditCard className="w-3 h-3"/> Salary</p>
                  <p className="text-sm text-white font-medium">{formatCurrency(trainer.salary)}</p>
                </div>
              </div>
            </div>
            <div className="border-t border-[#333] p-4 flex gap-2">
              <button className="flex-1 py-2 bg-[#1A1A1A] text-white rounded text-sm hover:bg-[#222]">Edit</button>
              <button className="flex-1 py-2 bg-red-500/10 text-red-500 rounded text-sm hover:bg-red-500/20">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
