import { SpaceFormData } from '@/lib/validations/space';

export interface ISpace extends SpaceFormData {
  _id: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}
