import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminAnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Announcements</h1>
        <p className="text-[#A3A3A3]">Broadcast important updates to your gym members.</p>
      </div>

      <Card className="bg-[slate-800] border-white/[0.06] text-white">
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
          <CardDescription className="text-[#A3A3A3]">Manage and publish new announcements.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border border-dashed border-white/[0.1] rounded-lg">
            <p className="text-[slate-400]">Announcement Manager Component Coming Soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
