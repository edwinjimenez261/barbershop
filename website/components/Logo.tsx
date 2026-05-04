import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative h-10 w-10 shrink-0">
        <div className="absolute inset-0 rounded-full bg-gold-gradient" />
        <div className="absolute inset-[2px] rounded-full bg-ink flex items-center justify-center">
          <span className="font-display text-xl font-bold gold-text leading-none">S</span>
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold text-bone">Stylos</span>
        <span className="text-[10px] uppercase tracking-[0.25em] text-gold/80">
          Barbershop 2
        </span>
      </div>
    </div>
  );
}
