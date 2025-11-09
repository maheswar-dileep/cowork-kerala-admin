import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

const topSpaces = [
  { name: 'WorkHub Kochi', bookings: 145, revenue: '₹725K' },
  { name: 'Executive Suites', bookings: 132, revenue: '₹350K' },
  { name: 'Virtual Office Pro', bookings: 98, revenue: '₹343K' },
  { name: 'CoWork Trivandrum', bookings: 87, revenue: '₹435K' },
  { name: 'Tech Hub Kozhikode', bookings: 76, revenue: '₹380K' },
];

export function TopSpaces() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Spaces</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topSpaces.map((space, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary p-2.5">
                  <Building2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium">{space.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {space.bookings} bookings
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{space.revenue}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
