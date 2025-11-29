import { useAnalytics } from '../hooks/useAnalytics';
import { AnalyticsCards } from '../components/AnalyticsCards';
import { SalesChart } from '../components/SalesChart';
import { Button } from '../components/ui/Button';

export const DashboardOverviewPage = () => {
  const { data, isLoading, isError } = useAnalytics();

  if (isLoading) return <p className="text-white/60">Loading analytics…</p>;
  if (isError) return <p className="text-white/60">Unable to load analytics right now.</p>;

  return (
    <div className="space-y-8 text-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase text-white/60">Organizer dashboard</p>
          <h1 className="text-3xl font-display">Performance overview</h1>
        </div>
        <Button variant="ghost">Create event</Button>
      </div>
      <AnalyticsCards metrics={data?.totals ?? {}} />
      <SalesChart data={data?.revenueTrend ?? []} />
    </div>
  );
};

