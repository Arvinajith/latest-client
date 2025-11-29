import { DASHBOARD_CARDS } from 'shared/constants.js';

interface Props {
  metrics: Record<string, number>;
}

export const AnalyticsCards = ({ metrics }: Props) => (
  <div className="grid gap-4 md:grid-cols-3">
    {DASHBOARD_CARDS.map((card) => (
      <div key={card.key} className="glass-panel p-5">
        <p className="text-xs uppercase tracking-wide text-charcoal/60">{card.label}</p>
        <p className="mt-2 text-3xl font-semibold text-charcoal">${metrics[card.key] || 0}</p>
        <p className="text-xs text-charcoal/40">Last 30 days</p>
      </div>
    ))}
  </div>
);

