import { useCallback, useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useLang } from '@/app/providers/LangContext';
import { t } from '@/lib/i18n';
import { LEAD_STATUSES } from '@/lib/constants';
import { leadsService } from '@/services';
import { AsyncState } from '@/components/shared/AsyncState';
import type { Lead } from '@/types';

export default function Leads() {
  const { lang } = useLang(); const [leads, setLeads] = useState<Lead[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => { setLoading(true); setError(null); try { setLeads(await leadsService.list()); } catch { setError(lang === 'ar' ? 'تعذر تحميل العملاء المحتملين.' : 'Leads could not be loaded.'); } finally { setLoading(false); } }, [lang]);
  useEffect(() => { void load(); }, [load]);
  return <DashboardLayout><h1 className="text-xl font-bold mb-6">{t('dashboardLeads', lang)}</h1><AsyncState loading={loading} error={error} empty={!loading && !error && leads.length === 0} loadingLabel={t('loading', lang)} errorLabel={error ?? ''} emptyLabel={t('noResults', lang)} retryLabel={lang === 'ar' ? 'إعادة المحاولة' : 'Try again'} onRetry={() => void load()} />{!loading && !error && leads.length > 0 && <Card padding={false}><div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-[var(--border)] text-[var(--muted-foreground)]"><th className="text-start px-4 py-3 font-medium">{lang === 'ar' ? 'الاسم' : 'Name'}</th><th className="text-start px-4 py-3 font-medium hidden sm:table-cell">{lang === 'ar' ? 'الهاتف' : 'Phone'}</th><th className="text-start px-4 py-3 font-medium">{t('status', lang)}</th><th className="text-start px-4 py-3 font-medium hidden md:table-cell">{lang === 'ar' ? 'المصدر' : 'Source'}</th></tr></thead><tbody>{leads.map((lead) => { const meta = LEAD_STATUSES[lead.status]; return <tr key={lead.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]"><td className="px-4 py-3 font-medium">{lead.full_name}</td><td className="px-4 py-3 text-[var(--muted-foreground)] hidden sm:table-cell numerals-latin">{lead.phone}</td><td className="px-4 py-3"><Badge variant={(meta?.color ?? 'gray') as 'green' | 'red' | 'blue' | 'gray'}>{lang === 'ar' ? meta?.label_ar : meta?.label}</Badge></td><td className="px-4 py-3 text-[var(--muted-foreground)] hidden md:table-cell">{lead.source}</td></tr>; })}</tbody></table></div></Card>}</DashboardLayout>;
}
