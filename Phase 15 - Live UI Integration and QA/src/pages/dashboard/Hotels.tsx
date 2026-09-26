import { useCallback, useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useLang } from '@/app/providers/LangContext';
import { t } from '@/lib/i18n';
import { hotelsService } from '@/services';
import { AsyncState } from '@/components/shared/AsyncState';
import type { Hotel } from '@/types';

export default function Hotels() {
  const { lang } = useLang(); const [hotels, setHotels] = useState<Hotel[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => { setLoading(true); setError(null); try { setHotels(await hotelsService.list()); } catch { setError(lang === 'ar' ? 'تعذر تحميل الفنادق.' : 'Hotels could not be loaded.'); } finally { setLoading(false); } }, [lang]);
  useEffect(() => { void load(); }, [load]);
  return <DashboardLayout><div className="flex items-center justify-between mb-6"><h1 className="text-xl font-bold">{t('dashboardHotels', lang)}</h1><Button size="sm">{t('addNew', lang)}</Button></div><AsyncState loading={loading} error={error} empty={!loading && !error && hotels.length === 0} loadingLabel={t('loading', lang)} errorLabel={error ?? ''} emptyLabel={t('noResults', lang)} retryLabel={lang === 'ar' ? 'إعادة المحاولة' : 'Try again'} onRetry={() => void load()} />{!loading && !error && hotels.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{hotels.map((hotel) => <Card key={hotel.id}><div className="flex items-start justify-between gap-3"><div><p className="font-semibold">{lang === 'ar' ? hotel.name_ar : hotel.name}</p><p className="text-sm text-[var(--muted-foreground)]">{lang === 'ar' ? hotel.destination_city_ar : hotel.destination_city} · {hotel.destination_country_code}</p><p className="text-xs text-[var(--muted-foreground)] mt-1 numerals-latin">{'★'.repeat(hotel.stars)}{'☆'.repeat(5 - hotel.stars)}</p></div><Badge variant={hotel.is_active ? 'green' : 'gray'}>{hotel.is_active ? (lang === 'ar' ? 'نشط' : 'Active') : (lang === 'ar' ? 'غير نشط' : 'Inactive')}</Badge></div></Card>)}</div>}</DashboardLayout>;
}
