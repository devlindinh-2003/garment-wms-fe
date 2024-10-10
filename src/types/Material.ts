import { MaterialType } from './MaterialType';
import { UnitOfMeasurement } from './UnitOfMeasurement';

export interface Material {
  id: string;
  materialTypeId: string;
  uomId: string;
  name: string;
  code: string;
  reorderLevel: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  materialUom: UnitOfMeasurement;
  materialType: MaterialType;
}
export interface MaterialForImportRequest {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
}
