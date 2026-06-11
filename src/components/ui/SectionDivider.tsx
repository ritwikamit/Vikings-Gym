import { cn } from '@/lib/utils';

interface SectionDividerProps {
  className?: string;
  variant?: 'line' | 'glow' | 'dots' | 'nordic';
}

export function SectionDivider({ className, variant = 'glow' }: SectionDividerProps) {
  if (variant === 'line') {
    return (
      <div className={cn('relative h-px w-full max-w-4xl mx-auto', className)}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={cn('flex justify-center gap-3 py-2', className)}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] opacity-30"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'nordic') {
    return (
      <div className={cn('flex items-center justify-center gap-4 py-4', className)}>
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#0EA5E9]/30" />
        <div className="w-3 h-3 rotate-45 border-2 border-[#0EA5E9]/40 bg-white/5" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#0EA5E9]/30" />
      </div>
    );
  }

  return (
    <div className={cn('relative h-16 flex items-center justify-center overflow-hidden', className)}>
      <div className="absolute left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[#0EA5E9]/40 to-transparent" />
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 bg-[#0EA5E9]/5 blur-2xl animate-pulse" />
      </div>
    </div>
  );
}
