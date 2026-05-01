import { initials } from '@/lib/utils';

export function BarberAvatar({
  fullName,
  colorHex,
  size = 48,
}: {
  fullName: string;
  colorHex: string;
  size?: number;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${colorHex}, ${colorHex}99)`,
        fontSize: size * 0.36,
      }}
      className="flex-shrink-0 rounded-full flex items-center justify-center text-white font-bold font-display border-[1.5px] border-gold/35 tracking-wide"
    >
      {initials(fullName)}
    </div>
  );
}
