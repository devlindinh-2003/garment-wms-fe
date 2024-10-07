import { Material } from './Material';

export interface MaterialVariant {
  id: string;
  materialId: string;
  name: string;
  code: string;
  packUnit: string;
  uomPerPack: number;
  packedWidth: number;
  packedLength: number;
  packedHeight: number;
  packedWeight: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  material: Material;
}
