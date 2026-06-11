import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function TrainerDietPlansPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Diet Plans</h1>
        <p className="text-[#A3A3A3]">Manage nutrition and diet plans for your assigned clients.</p>
      </div>

      <Card className="bg-[slate-800] border-white/[0.06] text-white">
        <CardHeader>
          <CardTitle>Diet Plan Builder</CardTitle>
          <CardDescription className="text-[#A3A3A3]">Create and assign new nutritional plans.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border border-dashed border-white/[0.1] rounded-lg">
            <p className="text-[slate-400]">Diet Plan Builder Component Coming Soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
