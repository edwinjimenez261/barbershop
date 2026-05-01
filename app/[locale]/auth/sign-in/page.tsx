import { getTranslations } from 'next-intl/server';
import { SignInForm } from '@/components/auth/sign-in-form';

export default async function SignInPage() {
  const t = await getTranslations('auth.signIn');
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-sm text-ink-muted mb-6">{t('subtitle')}</p>
        <SignInForm />
      </div>
    </main>
  );
}
