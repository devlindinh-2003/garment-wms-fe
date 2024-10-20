import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import { PageMeta } from './purchaseOrder';
import { PageMetaData } from './ImportRequestType';

// Unit of Measure (UOM)
export interface UOM {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// Material Type
export interface MaterialType {
  id: string;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

// Material
export interface Material {
  id: string;
  materialTypeId: string;
  materialUomId: string;
  name: string;
  code: string;
  reorderLevel: number;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  materialUom: UOM;
  materialType: MaterialType;
  materialVariant: MaterialVariant[]
  image: string | null;
  onHand: number;
  numberOfMaterialVariant: number;
}


export interface MaterialResponse {
  statusCode: number;
  data: {
    data: Material[];
    pageMeta: PageMetaData;
  };
  message: string;
  errors: any | null;
}

export interface MaterialReceiptResponse {
  statusCode: number;
  data: MaterialReceipt;
  message: string;
  errors: any | null;
}
export interface MaterialReceipt {
  materialimportReceipt: MaterialImportReceipt[];
    materialExportReceipt: MaterialExportReceipt[];
}
export interface MaterialImportReceipt{
  id: string;
  materialId: string;
  importReceiptId: string;
  expiredDate: string;
  quantityByPack:number;

  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}
export interface MaterialExportReceipt{
  id: string;
  materialId: string;
  exportReceiptId: string;
  expiredDate: string;
  quantityByPack:number;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}
export interface MaterialDataToRender {
  limit: number;
  page: number;
  total: number;
  totalFiltered: number;
  data: Material[];
}
export interface UseMaterialsInput {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  pagination: PaginationState;
}

// Material Variant
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
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  material: Material;
  inventoryStock: InventoryStock
}
export interface InventoryStock {
  id: string;
  materialVariantId: string | null;
  productVariantId: string | null;
  quantityByPack: number;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}
export type MaterialVariantResponse = {
  statusCode: number;
  data: {
    data: MaterialVariant[];
    pageMeta: PageMeta;
  };
  message: string;
  errors: any | null;
};
