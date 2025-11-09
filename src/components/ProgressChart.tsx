import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface ProgressChartProps {
  data: Array<{
    name: string;
    value: number;
    label?: string;
  }>;
  type?: 'bar' | 'line';
}

export default function ProgressChart({ data, type = 'bar' }: ProgressChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-red-300">
      <ResponsiveContainer width="100%" height={300}>
        {type === 'bar' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#991b1b" />
            <YAxis stroke="#991b1b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#f8fafc',
                border: '1px solid #dc2626',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="value" fill="#dc2626" radius={[8, 8, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#991b1b" />
            <YAxis stroke="#991b1b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#f8fafc',
                border: '1px solid #dc2626',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#dc2626" strokeWidth={2} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

