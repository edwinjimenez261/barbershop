import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider',
  {
    variants: {
      variant: {
        gold: 'bg-gold/15 text-gold border border-gold/30',
        success: 'bg-success/15 text-success border border-success/30',
        danger: 'bg-danger/15 text-danger border border-danger/30',
        muted: 'bg-surface text-ink-muted border border-gold/10',
      },
    },
    defaultVariants: { variant: 'muted' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
