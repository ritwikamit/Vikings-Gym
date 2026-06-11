import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function MemberDietPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">My Diet Plan</h1>
        <p className="text-[#A3A3A3]">View your assigned nutrition plan and macros.</p>
      </div>

      <Card className="bg-[slate-800] border-white/[0.06] text-white">
        <CardHeader>
          <CardTitle>Current Diet Plan</CardTitle>
          <CardDescription className="text-[#A3A3A3]">Follow this guide to achieve your fitness goals.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border border-dashed border-white/[0.1] rounded-lg">
            <p className="text-[slate-400]">Diet Plan Viewer Component Coming Soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
