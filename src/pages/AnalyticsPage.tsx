import { useAnalytics } from '../hooks/useAnalytics';
import { SalesChart } from '../components/SalesChart';

export const AnalyticsPage = () => {
  const { data, isLoading, isError } = useAnalytics();

  if (isLoading) return <p className="text-white/60">Loading insights…</p>;
  if (isError) return <p className="text-white/60">Unable to fetch analytics.</p>;

  return (
    <div className="space-y-6 text-white">
      <h2 className="text-3xl font-display">Ticket sales analytics</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <SalesChart data={data?.revenueTrend ?? []} />
        <div className="glass-panel p-6 text-charcoal">
          <h3 className="text-xl font-semibold">Ticket status</h3>
          <ul className="mt-4 space-y-3">
            {data?.ticketBreakdown?.map((item: any) => (
              <li key={item._id} className="flex items-center justify-between">
                <span className="capitalize">{item._id}</span>
                <span className="font-semibold">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

