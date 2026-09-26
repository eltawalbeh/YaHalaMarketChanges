import { useCallback, useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useLang } from '@/app/providers/LangContext';
import { t } from '@/lib/i18n';
import { quotesService } from '@/services';
import { AsyncState } from '@/components/shared/AsyncState';
import type { Quote } from '@/types';

export default function Quotes() {
  const { lang } = useLang(); const [quotes, setQuotes] = useState<Quote[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => { setLoading(true); setError(null); try { setQuotes(await quotesService.list()); } catch { setError(lang === 'ar' ? 'تعذر تحميل عروض الأسعار.' : 'Quotes could not be loaded.'); } finally { setLoading(false); } }, [lang]);
  useEffect(() => { void load(); }, [load]);
  return <DashboardLayout><h1 className="text-xl font-bold mb-6">{t('dashboardQuotes', lang)}</h1><AsyncState loading={loading} error={error} empty={!loading && !error && quotes.length === 0} loadingLabel={t('loading', lang)} errorLabel={error ?? ''} emptyLabel={lang === 'ar' ? 'لا توجد عروض أسعار بعد.' : 'No quotes yet.'} retryLabel={lang === 'ar' ? 'إعادة المحاولة' : 'Try again'} onRetry={() => void load()} />{!loading && !error && quotes.length > 0 && <Card padding={false}><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-[var(--border)] text-[var(--muted-foreground)]"><th className="text-start px-4 py-3 font-medium">{lang === 'ar' ? 'المرجع' : 'Reference'}</th><th className="text-start px-4 py-3 font-medium">{t('status', lang)}</th><th className="text-start px-4 py-3 font-medium">{lang === 'ar' ? 'الإجمالي' : 'Total'}</th><th className="text-start px-4 py-3 font-medium hidden sm:table-cell">{lang === 'ar' ? 'صالح حتى' : 'Valid until'}</th></tr></thead><tbody>{quotes.map((quote) => <tr key={quote.id} className="border-b border-[var(--border)] last:border-0"><td className="px-4 py-3 font-mono text-xs numerals-latin">{quote.token.slice(0, 10)}</td><td className="px-4 py-3"><Badge variant={quote.status === 'accepted' ? 'green' : quote.status === 'withdrawn' ? 'red' : 'gray'}>{quote.status}</Badge></td><td className="px-4 py-3 numerals-latin">{quote.total_price.toLocaleString()} {quote.currency}</td><td className="px-4 py-3 hidden sm:table-cell numerals-latin">{quote.valid_until}</td></tr>)}</tbody></table></div></Card>}</DashboardLayout>;
}
