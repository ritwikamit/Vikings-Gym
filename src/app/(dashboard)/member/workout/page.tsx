"use client";

import { Play, CheckCircle, Clock, AlertCircle } from "lucide-react";

const WORKOUT_PLAN = {
  name: "Hypertrophy Phase 1",
  trainer: "Rahul Singh",
  level: "Intermediate",
  goal: "Muscle Gain",
  daysPerWeek: 4,
  exercises: [
    { id: "1", name: "Barbell Bench Press", sets: 4, reps: "8-10", rest: "90s", notes: "Focus on slow eccentric." },
    { id: "2", name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "60s", notes: "Keep elbows tucked slightly." },
    { id: "3", name: "Cable Flyes", sets: 3, reps: "15", rest: "45s", notes: "Squeeze at the top." },
    { id: "4", name: "Overhead Tricep Extension", sets: 3, reps: "12", rest: "60s", notes: "Full range of motion." },
    { id: "5", name: "Tricep Pushdowns", sets: 3, reps: "15", rest: "45s", notes: "Use rope attachment." },
  ]
};

export default function MemberWorkoutPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">My Workout Plan</h1>
          <p className="text-sm text-slate-400">Your personalized training program.</p>
        </div>
      </div>

      <div className="glass rounded-xl p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{WORKOUT_PLAN.name}</h2>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500"/> Active Plan</span>
              <span>•</span>
              <span>Assigned by {WORKOUT_PLAN.trainer}</span>
              <span>•</span>
              <span className="bg-[slate-800] px-2 py-1 rounded text-xs border border-[slate-700]">{WORKOUT_PLAN.level}</span>
              <span className="bg-[slate-800] px-2 py-1 rounded text-xs border border-[slate-700]">{WORKOUT_PLAN.goal}</span>
            </div>
          </div>
          
          <button className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition w-full md:w-auto justify-center">
            <Play className="w-5 h-5 fill-current" /> Start Today's Workout
          </button>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-4 mb-6 border-b border-[slate-700]">
          {["Mon - Push", "Tue - Pull", "Wed - Rest", "Thu - Legs", "Fri - Upper", "Sat - Lower", "Sun - Rest"].map((day, i) => (
            <button 
              key={i} 
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition ${
                i === 0 ? "bg-sky-600 text-white" : "text-slate-400 hover:bg-white/5"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-slate-400" />
            <span className="text-white font-medium">Estimated Time: 60-75 mins</span>
          </div>
          
          {WORKOUT_PLAN.exercises.map((exercise, index) => (
            <div key={exercise.id} className="bg-[slate-800] border border-[slate-700] rounded-lg p-4 flex flex-col md:flex-row justify-between gap-4 group hover:border-[#444] transition">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[slate-800] text-slate-400 flex items-center justify-center font-bold shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h4 className="text-white font-medium text-lg mb-1">{exercise.name}</h4>
                  <p className="text-sm text-slate-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> {exercise.notes}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 md:gap-8 items-center border-t border-[slate-700] md:border-t-0 pt-4 md:pt-0">
                <div className="text-center">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Sets</p>
                  <p className="text-lg font-bold text-white">{exercise.sets}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Reps</p>
                  <p className="text-lg font-bold text-white">{exercise.reps}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Rest</p>
                  <p className="text-lg font-bold text-white">{exercise.rest}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
