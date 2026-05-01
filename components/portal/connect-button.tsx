'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function ConnectButton({ label }: { label: string }) {
  const [loading, setLoading] = useState(false);

  const start = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stripe/connect/onboard', { method: 'POST' });
      if (!res.ok) throw new Error('failed');
      const j = await res.json();
      if (j.url) window.location.href = j.url;
    } catch {
      setLoading(false);
    }
  };

  return (
    <Button onClick={start} disabled={loading}>
      {loading ? '…' : label}
    </Button>
  );
}
