import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function MemberAttendancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">My Attendance</h1>
        <p className="text-[#A3A3A3]">Track your gym visits and check-in history.</p>
      </div>

      <Card className="bg-[#1A1A1A] border-white/[0.06] text-white">
        <CardHeader>
          <CardTitle>Attendance Record</CardTitle>
          <CardDescription className="text-[#A3A3A3]">View your attendance log for the current month.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border border-dashed border-white/[0.1] rounded-lg">
            <p className="text-[#737373]">Attendance History Component Coming Soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
