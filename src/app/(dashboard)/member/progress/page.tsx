import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function MemberProgressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">My Progress</h1>
        <p className="text-[#A3A3A3]">Track your body measurements and fitness milestones.</p>
      </div>

      <Card className="bg-[slate-800] border-white/[0.06] text-white">
        <CardHeader>
          <CardTitle>Body Metrics</CardTitle>
          <CardDescription className="text-[#A3A3A3]">Monitor your weight, BMI, and other measurements.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border border-dashed border-white/[0.1] rounded-lg">
            <p className="text-[slate-400]">Progress Charts Component Coming Soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
