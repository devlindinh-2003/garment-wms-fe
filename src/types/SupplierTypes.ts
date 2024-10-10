// Supplier Type
export interface Supplier {
  id: string;
  supplierName: string;
  supplierCode: string;
  address: string;
  representativeName: string;
  email: string;
  phoneNumber: string;
  fax: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}
