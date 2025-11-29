import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Props {
  data: { _id: number; total: number }[];
}

export const SalesChart = ({ data }: Props) => (
  <div className="glass-panel h-80 p-6">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <p className="text-xs uppercase text-charcoal/60">Revenue trend</p>
        <p className="text-xl font-semibold text-charcoal">Monthly ticket sales</p>
      </div>
      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Live</span>
    </div>
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#5E4AE3" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#5E4AE3" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="_id" tickLine={false} axisLine={false} tick={{ fill: '#888' }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fill: '#888' }} />
        <Tooltip />
        <Area type="monotone" dataKey="total" stroke="#5E4AE3" fillOpacity={1} fill="url(#colorRevenue)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

