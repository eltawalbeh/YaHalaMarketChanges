import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '@/components/public/PublicLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useLang } from '@/app/providers/LangContext';
import { t } from '@/lib/i18n';
import { offersService } from '@/services';
import { formatPrice } from '@/lib/utils';
import { PUBLIC_ROUTES } from '@/lib/routes';
import { AsyncState } from '@/components/shared/AsyncState';
import type { Offer } from '@/types';

export default function Offers() {
  const { lang } = useLang();
  const [offers, setOffers] = useState<Offer[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => { setLoading(true); setError(null); try { setOffers(await offersService.list({ status: 'published' })); } catch { setError(lang === 'ar' ? 'تعذر تحميل العروض حالياً.' : 'Offers could not be loaded right now.'); } finally { setLoading(false); } }, [lang]);
  useEffect(() => { void load(); }, [load]);
  return <PublicLayout><h1 className="text-2xl font-bold mb-6">{t('offers', lang)}</h1><AsyncState loading={loading} error={error} empty={!loading && !error && offers.length === 0} loadingLabel={t('loading', lang)} errorLabel={error ?? ''} emptyLabel={t('noResults', lang)} retryLabel={lang === 'ar' ? 'إعادة المحاولة' : 'Try again'} onRetry={() => void load()} />{!loading && !error && offers.length > 0 && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{offers.map((offer) => <Card key={offer.id} padding={false} className="overflow-hidden hover:shadow-md transition-shadow"><div className="h-40 bg-[var(--muted)] flex items-center justify-center"><span className="text-3xl opacity-20">✈</span></div><div className="p-4"><p className="text-xs text-[var(--muted-foreground)] mb-1">{lang === 'ar' ? offer.destination.city_ar : offer.destination.city}</p><h2 className="font-semibold mb-2 leading-snug">{lang === 'ar' ? offer.title_ar : offer.title}</h2><div className="flex items-center justify-between"><span className="font-bold text-[var(--primary)] numerals-latin">{formatPrice(offer.pricing.base_price, offer.pricing.currency)}</span><Link to={PUBLIC_ROUTES.offerDetail(offer.slug)} className="text-sm text-[var(--primary)] hover:underline">{t('viewOffer', lang)} →</Link></div><div className="mt-2 flex gap-1.5">{offer.pricing.includes_flights && <Badge variant="teal">{t('includesFlights', lang)}</Badge>}</div></div></Card>)}</div>}</PublicLayout>;
}
