import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TrainerWorkoutPlansPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Workout Plans</h1>
        <p className="text-[#A3A3A3]">Manage workout routines for your assigned clients.</p>
      </div>

      <Card className="bg-[#1A1A1A] border-white/[0.06] text-white">
        <CardHeader>
          <CardTitle>Workout Plan Builder</CardTitle>
          <CardDescription className="text-[#A3A3A3]">Create and assign new plans.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border border-dashed border-white/[0.1] rounded-lg">
            <p className="text-[#737373]">Workout Plan Builder Component Coming Soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
