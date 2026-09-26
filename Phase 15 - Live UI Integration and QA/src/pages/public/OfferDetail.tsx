import { useCallback, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PublicLayout } from '@/components/public/PublicLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useLang } from '@/app/providers/LangContext';
import { t } from '@/lib/i18n';
import { offersService } from '@/services';
import { formatPrice } from '@/lib/utils';
import { PUBLIC_ROUTES } from '@/lib/routes';
import { AsyncState } from '@/components/shared/AsyncState';
import type { Offer } from '@/types';

export default function OfferDetail() {
  const { slug } = useParams<{ slug: string }>(); const { lang } = useLang(); const [offer, setOffer] = useState<Offer | null>(null); const [loading, setLoading] = useState(true); const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => { if (!slug) return; setLoading(true); setError(null); try { setOffer(await offersService.getBySlug(slug)); } catch { setError(lang === 'ar' ? 'تعذر تحميل تفاصيل العرض.' : 'Offer details could not be loaded.'); } finally { setLoading(false); } }, [slug, lang]);
  useEffect(() => { void load(); }, [load]);
  if (loading || error || !offer) return <PublicLayout><AsyncState loading={loading} error={error ?? (!loading ? (lang === 'ar' ? 'العرض غير موجود.' : 'Offer not found.') : null)} empty={false} loadingLabel={t('loading', lang)} errorLabel={error ?? (lang === 'ar' ? 'العرض غير موجود.' : 'Offer not found.')} emptyLabel="" retryLabel={lang === 'ar' ? 'إعادة المحاولة' : 'Try again'} onRetry={() => void load()} /></PublicLayout>;
  const title = lang === 'ar' ? offer.title_ar : offer.title; const desc = lang === 'ar' ? offer.description_ar : offer.description; const city = lang === 'ar' ? offer.destination.city_ar : offer.destination.city; const country = lang === 'ar' ? offer.destination.country_ar : offer.destination.country;
  return <PublicLayout><article className="max-w-3xl mx-auto"><Link to={PUBLIC_ROUTES.offers} className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] mb-6 inline-block">← {t('offers', lang)}</Link><div className="h-64 rounded-[var(--radius)] bg-[var(--muted)] flex items-center justify-center mb-6" role="img" aria-label={title}><span className="text-5xl opacity-20" aria-hidden="true">✈</span></div><p className="text-sm text-[var(--muted-foreground)] mb-2">{city}, {country}</p><h1 className="text-3xl font-bold mb-3">{title}</h1><p className="text-[var(--muted-foreground)] leading-relaxed mb-6">{desc}</p><div className="flex flex-wrap gap-2 mb-8">{offer.pricing.includes_flights && <Badge variant="teal">{t('includesFlights', lang)}</Badge>}{offer.pricing.includes_hotel && <Badge variant="gray">{t('includesHotel', lang)}</Badge>}{offer.pricing.includes_transfers && <Badge variant="blue">{t('includesTransfers', lang)}</Badge>}</div><section className="border border-[var(--border)] rounded-[var(--radius)] p-5"><div className="flex items-center justify-between gap-4"><div><p className="text-2xl font-bold text-[var(--primary)] numerals-latin">{formatPrice(offer.pricing.base_price, offer.pricing.currency)}</p><p className="text-sm text-[var(--muted-foreground)]">{offer.duration_nights} {t('nights', lang)}{offer.pricing.per_person ? ` · ${t('perPerson', lang)}` : ''}</p></div><Button size="lg">{t('requestQuote', lang)}</Button></div></section></article></PublicLayout>;
}
