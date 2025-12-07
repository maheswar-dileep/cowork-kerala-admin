import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ISpace } from '@/types';

interface SpacesTableProps {
  spaces: ISpace[];
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

const getTypeBadgeColor = (type: string): string => {
  switch (type) {
    case 'Coworking Space':
      return 'bg-accent/10 text-accent hover:bg-accent/20';
    case 'Virtual Office':
      return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
    case 'Private Office':
      return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export function SpacesTable({ spaces, onDelete, isLoading }: SpacesTableProps) {
  const router = useRouter();

  const handleEdit = (id: string) => {
    router.push(`/spaces/${id}/edit`);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      onDelete?.(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (spaces?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 p-8 text-gray-500">
        <p>No spaces found. Create one to get started.</p>
      </div>
    );
  }

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
          {spaces?.map(space => (
            <TableRow key={space._id || space.id}>
              <TableCell>
                <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-muted">
                  {space.images && space.images[0] ? (
                    <Image
                      src={space.images[0]}
                      alt={space.spaceName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xs font-medium text-primary">
                      {space.spaceName?.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="font-medium">{space.spaceName}</TableCell>
              <TableCell>
                <Badge className={getTypeBadgeColor(space.spaceType)}>
                  {space.spaceType}
                </Badge>
              </TableCell>
              <TableCell>{space.city}</TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                {space.pricing?.hotDesk ? `₹${space.pricing.hotDesk}/mo` : '-'}
              </TableCell>
              <TableCell>
                <Badge
                  variant={space.status === 'active' ? 'default' : 'secondary'}
                >
                  {space.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      handleEdit(space._id || (space.id as string))
                    }
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() =>
                      handleDelete(
                        space._id || (space.id as string),
                        space.spaceName
                      )
                    }
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
