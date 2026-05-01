'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input, FieldLabel } from '@/components/ui/input';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export function SignInForm() {
  const t = useTranslations('auth.signIn');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: err } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (err) throw err;
      setSent(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-lg border border-success/30 bg-success/10 p-4 text-sm text-ink">
        {t('sent')}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <FieldLabel>{t('email')}</FieldLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          placeholder="tu@email.com"
        />
      </div>
      {error && <div className="text-xs text-danger">{error}</div>}
      <Button type="submit" size="lg" className="w-full" disabled={loading || !email}>
        {loading ? '…' : t('send')}
      </Button>
    </form>
  );
}
