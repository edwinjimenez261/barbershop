import * as React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'flex h-12 w-full rounded-md border border-gold/15 bg-surface px-4 py-2 text-sm text-ink placeholder:text-ink-dim focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex w-full rounded-md border border-gold/15 bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-dim focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none',
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';

export function FieldLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <label
      className={cn(
        'block text-[11px] font-semibold uppercase tracking-wider text-ink-muted mb-2',
        className,
      )}
    >
      {children}
    </label>
  );
}
