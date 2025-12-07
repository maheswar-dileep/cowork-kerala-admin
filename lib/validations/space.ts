import { z } from 'zod';

export const pricingSchema = z.object({
  hotDesk: z.coerce.number().positive('Must be positive').optional(),
  dedicatedDesk: z.coerce.number().positive('Must be positive').optional(),
  privateOffice: z.coerce.number().positive('Must be positive').optional(),
});

export const locationSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  pincode: z.string().min(1, 'Pincode is required'),
  landmark: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  googleMapsUrl: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1, 'Contact name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

export const spaceSchema = z.object({
  spaceName: z.string().min(1, 'Space name is required'),
  spaceType: z.string().min(1, 'Space type is required'),
  city: z.string().min(1, 'City is required'),
  spaceCategory: z.string().min(1, 'Space category is required'),
  shortDescription: z.string().optional(),
  longDescription: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  amenities: z.array(z.string()),
  pricing: pricingSchema.optional(),
  location: locationSchema.optional(),
  contact: contactSchema.optional(),
  images: z.array(z.string().url()),
  status: z.enum(['active', 'inactive', 'pending']),
});

export type SpaceFormData = z.infer<typeof spaceSchema>;

export const spaceTypeOptions = [
  { label: 'Coworking Space', value: 'Coworking Space' },
  { label: 'Virtual Office', value: 'Virtual Office' },
  { label: 'Private Office', value: 'Private Office' },
  { label: 'Meeting Room', value: 'Meeting Room' },
];

export const cityOptions = [
  { label: 'Kochi', value: 'Kochi' },
  { label: 'Trivandrum', value: 'Trivandrum' },
  { label: 'Kozhikode', value: 'Kozhikode' },
  { label: 'Thrissur', value: 'Thrissur' },
  { label: 'Kannur', value: 'Kannur' },
];

export const categoryOptions = [
  { label: 'Budget', value: 'Budget' },
  { label: 'Premium', value: 'Premium' },
  { label: 'Luxury', value: 'Luxury' },
];
