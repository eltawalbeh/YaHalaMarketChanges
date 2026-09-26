import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { AsyncState } from '@/components/shared/AsyncState';
import { useLang } from '@/app/providers/LangContext';
import { quotesService, type Quote } from '@/services';

export default function QuotePage() {
  const { lang } = useLang();
  const { token } = useParams<{ token: string }>();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => { setLoading(true); setError(null); try { if (!token) throw new Error('MISSING_TOKEN'); setQuote(await quotesService.getByToken(token)); } catch { setError('LOAD_FAILED'); } finally { setLoading(false); } }, [token]);
  useEffect(() => { void load(); }, [load]);
  const errorLabel = error === 'MISSING_TOKEN' ? (lang === 'ar' ? 'رابط العرض غير صالح.' : 'This quote link is invalid.') : (lang === 'ar' ? 'تعذر تحميل العرض.' : 'Unable to load this quote.');
  return <main className="min-h-screen bg-[var(--background)] p-6"><div className="mx-auto max-w-3xl"><AsyncState loading={loading} error={error} empty={!quote} loadingLabel={lang === 'ar' ? 'جارٍ التحميل…' : 'Loading…'} errorLabel={errorLabel} emptyLabel={lang === 'ar' ? 'العرض غير موجود.' : 'Quote not found.'} retryLabel={lang === 'ar' ? 'إعادة المحاولة' : 'Retry'} onRetry={() => void load()} />{quote && <Card><div className="flex items-start justify-between gap-4"><div><h1 className="text-2xl font-bold">{lang === 'ar' ? 'عرض السفر' : 'Travel quote'}</h1><p className="mt-2 text-sm text-[var(--muted-foreground)]">{quote.token}</p></div><p className="text-xl font-bold numerals-latin">{quote.total_price.toLocaleString()} {quote.currency}</p></div><div className="mt-6 space-y-3">{quote.line_items.map((item, index) => <div key={`${item.label}-${index}`} className="flex justify-between border-b border-[var(--border)] pb-3 text-sm"><span>{lang === 'ar' ? item.label_ar : item.label}</span><span className="numerals-latin">{(item.quantity * item.unit_price).toLocaleString()} {item.currency}</span></div>)}</div><p className="mt-6 text-sm text-[var(--muted-foreground)]">{lang === 'ar' ? 'صالح حتى' : 'Valid until'}: <span className="numerals-latin">{quote.valid_until}</span></p></Card>}</div></main>;
}
