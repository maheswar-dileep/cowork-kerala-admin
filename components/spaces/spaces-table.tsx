'use client';

import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CoworkingSpace } from '@/lib/data/spaces';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SpacesTableProps {
  spaces: CoworkingSpace[];
  onDelete?: (id: string) => void;
}

const getTypeBadgeVariant = (
  type: string
): 'default' | 'secondary' | 'outline' => {
  switch (type) {
    case 'Coworking Space':
      return 'default';
    case 'Virtual Office':
      return 'secondary';
    case 'Private Office':
      return 'outline';
    default:
      return 'default';
  }
};

const getTypeBadgeColor = (type: string): string => {
  switch (type) {
    case 'Coworking Space':
      return 'bg-accent/10 text-accent hover:bg-accent/20';
    case 'Virtual Office':
      return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
    case 'Private Office':
      return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
    default:
      return '';
  }
};

export function SpacesTable({ spaces, onDelete }: SpacesTableProps) {
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/spaces/edit/${id}`);
  };

  const handleView = (id: string) => {
    router.push(`/spaces/${id}`);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      onDelete?.(id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Space Image</TableHead>
            <TableHead>Space Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Price Range</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {spaces.map(space => (
            <TableRow key={space.id}>
              <TableCell>
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg bg-muted">
                  <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xs font-medium text-primary">
                    {space.name.substring(0, 2).toUpperCase()}
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">{space.name}</TableCell>
              <TableCell>
                <Badge className={getTypeBadgeColor(space.type)}>
                  {space.type}
                </Badge>
              </TableCell>
              <TableCell>{space.location}</TableCell>
              <TableCell>{space.capacity}</TableCell>
              <TableCell>{space.priceRange}</TableCell>
              <TableCell>
                <Switch checked={space.status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleEdit(space.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleView(space.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(space.id, space.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
