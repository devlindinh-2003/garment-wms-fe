import { UseGetTableResponseType } from "./CompositeTable";

export interface ImportRequest {
  id: String;
  poReceiptId?: String;
  warehouseStaffName?: String;
  supplier?: String;
  deliveryType?: String;
  deliveryDate?: String;
  status?: ImportRequestStatus;
}

export interface ImportRequestDetails {
  materialId?: String;
  materialName?: String;
  SKU?: String;
  UOM?: String;
  plannedQuantity?: number;
  actualQuantity?: number;
}
enum ImportRequestStatus {
  PENDING,
  REJECTED,
  APPROVED,
  IN_PROGRESS,
  FINISHED
}

export const importRequestsData: UseGetTableResponseType<ImportRequest> = {
    limit: 10,
    page: 1,
    total: 20, // assuming there are 20 total records in the system
    totalFiltered: 10, // assuming 10 records are shown after filtering
    data: [
      {
        id: "IR001",
        poReceiptId: "PO12345",
        warehouseStaffName: "John Doeê",
        supplier: "ABC Supplies Ltd.",
        deliveryType: "Air",
        deliveryDate: "2024-09-28",
        status: ImportRequestStatus.PENDING,
      },
      {
        id: "IR002",
        poReceiptId: "PO12346",
        warehouseStaffName: "Jane Smith",
        supplier: "Global Trading Co.",
        deliveryType: "Sea",
        deliveryDate: "2024-09-27",
        status: ImportRequestStatus.APPROVED,
      },
      {
        id: "IR003",
        poReceiptId: "PO12347",
        warehouseStaffName: "Michael Johnson",
        supplier: "Speedy Logistics",
        deliveryType: "Truck",
        deliveryDate: "2024-09-26",
        status: ImportRequestStatus.REJECTED,
      },
      {
        id: "IR004",
        poReceiptId: "PO12348",
        warehouseStaffName: "Sarah Connor",
        supplier: "Supply Hub Inc.",
        deliveryType: "Rail",
        deliveryDate: "2024-09-30",
        status: ImportRequestStatus.FINISHED,
      },
      {
        id: "IR005",
        poReceiptId: "PO12349",
        warehouseStaffName: "Tom Brady",
        supplier: "Prime Vendors",
        deliveryType: "Air",
        deliveryDate: "2024-10-01",
        status: ImportRequestStatus.IN_PROGRESS,
      },
      {
        id: "IR006",
        poReceiptId: "PO12350",
        warehouseStaffName: "Emma Watson",
        supplier: "Regional Distributors",
        deliveryType: "Sea",
        deliveryDate: "2024-09-29",
        status: ImportRequestStatus.APPROVED,
      },
      {
        id: "IR007",
        poReceiptId: "PO12351",
        warehouseStaffName: "Chris Evans",
        supplier: "FastTrack Shipping",
        deliveryType: "Truck",
        deliveryDate: "2024-10-02",
        status: ImportRequestStatus.PENDING,
      },
      {
        id: "IR008",
        poReceiptId: "PO12352",
        warehouseStaffName: "Natalie Portman",
        supplier: "Fresh Supplies Inc.",
        deliveryType: "Air",
        deliveryDate: "2024-10-03",
        status: ImportRequestStatus.FINISHED,
      },
      {
        id: "IR009",
        poReceiptId: "PO12353",
        warehouseStaffName: "Robert Downey",
        supplier: "Electro Distributors",
        deliveryType: "Rail",
        deliveryDate: "2024-10-04",
        status: ImportRequestStatus.IN_PROGRESS,
      },
      {
        id: "IR010",
        poReceiptId: "PO12354",
        warehouseStaffName: "Scarlett Johansson",
        supplier: "MegaWholesalers",
        deliveryType: "Sea",
        deliveryDate: "2024-10-05",
        status: ImportRequestStatus.REJECTED,
      }
    ]
  };
  