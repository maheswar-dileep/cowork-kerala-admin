export interface Lead {
  id: string;
  _id?: string;
  leadId?: string;
  name: string;
  email: string;
  phone: string;
  enquiredFor: string;
  spaceType: string;
  numberOfSeats?: number;
  location?: string;
  message?: string;
  date: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  createdAt?: string;
  updatedAt?: string;
}

export const statusOptions = [
  { label: 'New', value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Qualified', value: 'qualified' },
  { label: 'Converted', value: 'converted' },
  { label: 'Lost', value: 'lost' },
];
