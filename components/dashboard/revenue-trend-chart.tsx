'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', bookings: 45, revenue: 48000 },
  { month: 'Feb', bookings: 52, revenue: 52000 },
  { month: 'Mar', bookings: 48, revenue: 49000 },
  { month: 'Apr', bookings: 61, revenue: 58000 },
  { month: 'May', bookings: 55, revenue: 55000 },
  { month: 'Jun', bookings: 67, revenue: 65000 },
  { month: 'Jul', bookings: 72, revenue: 68000 },
  { month: 'Aug', bookings: 65, revenue: 66000 },
  { month: 'Sep', bookings: 78, revenue: 75000 },
  { month: 'Oct', bookings: 82, revenue: 78000 },
];

export function RevenueTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue & Bookings Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="bookings"
              stroke="#93c5c0"
              strokeWidth={2}
              dot={{ fill: '#2d6a5e', r: 4 }}
              name="Bookings"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#2d6a5e"
              strokeWidth={2}
              dot={{ fill: '#2d6a5e', r: 4 }}
              name="Revenue (₹)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
