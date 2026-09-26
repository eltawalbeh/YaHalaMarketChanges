import { Button } from '@/components/ui/Button';

export function AsyncState({
  loading,
  error,
  empty,
  loadingLabel,
  errorLabel,
  emptyLabel,
  retryLabel,
  onRetry,
}: {
  loading: boolean;
  error: string | null;
  empty: boolean;
  loadingLabel: string;
  errorLabel: string;
  emptyLabel: string;
  retryLabel: string;
  onRetry?: () => void;
}) {
  if (loading) return <p className="py-12 text-center text-[var(--muted-foreground)]">{loadingLabel}</p>;
  if (error) return <div className="py-12 text-center"><p className="text-sm text-red-700 mb-3">{errorLabel}</p>{onRetry && <Button size="sm" variant="secondary" onClick={onRetry}>{retryLabel}</Button>}</div>;
  if (empty) return <p className="py-12 text-center text-[var(--muted-foreground)]">{emptyLabel}</p>;
  return null;
}
