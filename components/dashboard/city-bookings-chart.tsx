'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { city: 'Kochi', bookings: 45 },
  { city: 'Trivandrum', bookings: 38 },
  { city: 'Kozhikode', bookings: 32 },
  { city: 'Thrissur', bookings: 25 },
  { city: 'Kannur', bookings: 18 },
];

export function CityBookingsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>City-wise Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="city"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="bookings" fill="#2d6a5e" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
