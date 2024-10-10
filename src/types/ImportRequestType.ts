import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";

export interface ImportRequest {
  id: string;
  poDelivery?: poDelivery;
  warehouseStaffName?: string;
  type: string
  supplier?: string;
  deliveryType?: string;
  createdAt?: string;
  updatedAt?: string;
  finishAt?: string;
  importRequestDetail?: ImportRequestDetails[];
  status?: string;
}
export interface poDelivery{
  id: string,
  purchaseOrderId: string,
  expectedDeliverDate: string,
  deliverDate: string,
  purchaseOrder: PurchaseOrder
}
export interface PurchaseOrder{
  id: string,
  poNumber: string,
  supplier: Supplier,
  status: string
}
export interface Supplier{
  supplierName: string,
  address: string,
  email: string,
  phoneNumber: string,
  fax: string
}
export interface ImportRequestDetails {
  id: string;
  materialVariant?: MaterialVariant;
  quantityByPack?: number;
}

export interface MaterialVariant{
  id: string;
  name: string;
  code:string;
  packUnit: string;
  uomPerPack: number;
  material: Material;
}
export interface Material{
  id: string;
  name: string;
  code: string;
  reorderLevel: number;
  materialType: MaterialType;
}
export interface MaterialType{
  id: string;
  name: string;
  code: string;
}
enum ImportRequestStatus {
  PENDING,
  REJECTED,
  APPROVED,
  IN_PROGRESS,
  FINISHED
}

export interface UseImportRequestsResponse {
  pageMeta: PageMetaData;
  data: ImportRequest[];
}

export interface UseImportRequestsInput {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  pagination: PaginationState;
}
export interface PageMetaData{
  totalItems: number;
  offset: number;
  limit: number;
  page: number;
  totalPages: number;
}

  
