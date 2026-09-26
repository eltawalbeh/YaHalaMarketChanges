import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useLang } from '@/app/providers/LangContext';
import { t } from '@/lib/i18n';
import { OFFER_STATUSES } from '@/lib/constants';
import { DASHBOARD_ROUTES } from '@/lib/routes';
import { offersService } from '@/services';
import { formatPrice } from '@/lib/utils';
import { AsyncState } from '@/components/shared/AsyncState';
import type { Offer } from '@/types';

export default function Offers() {
  const { lang } = useLang(); const [offers, setOffers] = useState<Offer[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => { setLoading(true); setError(null); try { setOffers(await offersService.list()); } catch { setError(lang === 'ar' ? 'تعذر تحميل العروض.' : 'Offers could not be loaded.'); } finally { setLoading(false); } }, [lang]);
  useEffect(() => { void load(); }, [load]);
  return <DashboardLayout><div className="flex items-center justify-between mb-6"><h1 className="text-xl font-bold">{t('dashboardOffers', lang)}</h1><Link to={DASHBOARD_ROUTES.offerNew}><Button size="sm">{t('addNew', lang)}</Button></Link></div><AsyncState loading={loading} error={error} empty={!loading && !error && offers.length === 0} loadingLabel={t('loading', lang)} errorLabel={error ?? ''} emptyLabel={t('noResults', lang)} retryLabel={lang === 'ar' ? 'إعادة المحاولة' : 'Try again'} onRetry={() => void load()} />{!loading && !error && offers.length > 0 && <Card padding={false}><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-[var(--border)] text-[var(--muted-foreground)]"><th className="text-start px-4 py-3 font-medium">{lang === 'ar' ? 'العنوان' : 'Title'}</th><th className="text-start px-4 py-3 font-medium hidden sm:table-cell">{lang === 'ar' ? 'الوجهة' : 'Destination'}</th><th className="text-start px-4 py-3 font-medium">{t('status', lang)}</th><th className="text-start px-4 py-3 font-medium hidden md:table-cell">{lang === 'ar' ? 'السعر' : 'Price'}</th></tr></thead><tbody>{offers.map((offer) => { const statusMeta = OFFER_STATUSES[offer.status]; return <tr key={offer.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]"><td className="px-4 py-3 font-medium">{lang === 'ar' ? offer.title_ar : offer.title}</td><td className="px-4 py-3 text-[var(--muted-foreground)] hidden sm:table-cell">{lang === 'ar' ? offer.destination.city_ar : offer.destination.city}</td><td className="px-4 py-3"><Badge variant={(statusMeta?.color ?? 'gray') as 'green' | 'gray' | 'yellow' | 'red'}>{lang === 'ar' ? statusMeta?.label_ar : statusMeta?.label}</Badge></td><td className="px-4 py-3 numerals-latin hidden md:table-cell">{formatPrice(offer.pricing.base_price, offer.pricing.currency)}</td></tr>; })}</tbody></table></div></Card>}</DashboardLayout>;
}
