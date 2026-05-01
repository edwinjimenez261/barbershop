import { getTranslations } from 'next-intl/server';
import { Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default async function BarberGaleria() {
  const t = await getTranslations('barberPortal.gallery');

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="font-display text-3xl font-bold">{t('title')}</h1>
        <Button>
          <Upload className="w-4 h-4" />
          {t('upload')}
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="aspect-square rounded-md border border-gold/15"
            style={{
              background: `linear-gradient(${135 + i * 30}deg, hsl(${20 + i * 8} 22% 22%) 0%, hsl(${30 + i * 8} 28% 12%) 100%)`,
            }}
          />
        ))}
      </div>

      <Card className="p-8 text-center text-sm text-ink-muted border-dashed">
        {t('empty')}
      </Card>
    </div>
  );
}
