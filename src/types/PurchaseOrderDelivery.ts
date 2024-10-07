import { UseGetTableResponseType } from './CompositeTable';
import { MaterialVariant } from './MaterialVariant';

export interface PurchaseOrderDelivery {
  poDeliveryDetail: PurchaseOrderDeliveryDetail[];
}

export interface PurchaseOrderDeliveryDetail {
  materialVariant: MaterialVariant;
}

// Mock Data in UseGetTableResponseType format
export const purchaseOrderDeliveryData: UseGetTableResponseType<MaterialVariant> = {
  limit: 10,
  page: 1,
  total: 20,
  total_filtered: 10,
  data: [
    {
      id: '01a25e53-ebf5-46cf-abbf-8e5779bd97a3',
      materialId: '5500a286-b4a0-4911-822e-5a35984f9a86',
      name: '100% Cotton Fabric',
      code: 'COTTON123',
      packUnit: 'Roll',
      uomPerPack: 10,
      packedWidth: 150,
      packedLength: 50,
      packedHeight: 30,
      packedWeight: 25,
      createdAt: '2024-10-04T18:58:36.483Z',
      updatedAt: '2024-10-04T18:58:36.483Z',
      deletedAt: null,
      material: {
        id: '5500a286-b4a0-4911-822e-5a35984f9a86',
        materialTypeId: 'a46b2644-e20f-4e5d-943e-05b41b6c36b1',
        uomId: '47794063-c3d1-45a0-add6-5f0914d43d07',
        name: 'Cotton',
        code: 'COTTON001',
        reorderLevel: 5,
        createdAt: '2024-10-04T18:05:03.484Z',
        updatedAt: '2024-10-04T18:05:03.484Z',
        deletedAt: null,
        uom: {
          id: '47794063-c3d1-45a0-add6-5f0914d43d07',
          name: 'm',
          createdAt: '2024-10-04T18:04:22.609Z',
          updatedAt: '2024-10-04T18:04:22.609Z',
          deletedAt: null
        },
        materialType: {
          id: 'a46b2644-e20f-4e5d-943e-05b41b6c36b1',
          name: 'Fabric',
          code: 'FAB001',
          createdAt: '2024-10-04T18:03:50.032Z',
          updatedAt: '2024-10-04T18:03:50.032Z',
          deletedAt: null
        }
      }
    },
    {
      id: '2123',
      materialId: 'fabric-5501',
      name: 'Polyester Blend Fabric',
      code: 'POLYBLEND001',
      packUnit: 'Roll',
      uomPerPack: 1,
      packedWidth: 150,
      packedLength: 50,
      packedHeight: 50,
      packedWeight: 20,
      createdAt: '2024-10-04T18:58:36.483Z',
      updatedAt: '2024-10-04T18:58:36.483Z',
      deletedAt: null,
      material: {
        id: '5501b386-c4b1-5912-933e-6b45984f0b97',
        materialTypeId: 'b56c3745-f31f-5f6e-a54f-06c52d6f47c2',
        uomId: '48795073-d4f2-56b1-bbd7-6f1915e54d18',
        name: 'Polyester Blend',
        code: 'POLYBLEND123',
        reorderLevel: 10,
        createdAt: '2024-10-04T18:05:03.484Z',
        updatedAt: '2024-10-04T18:05:03.484Z',
        deletedAt: null,
        uom: {
          id: '48795073-d4f2-56b1-bbd7-6f1915e54d18',
          name: 'm',
          createdAt: '2024-10-04T18:04:22.609Z',
          updatedAt: '2024-10-04T18:04:22.609Z',
          deletedAt: null
        },
        materialType: {
          id: 'b56c3745-f31f-5f6e-a54f-06c52d6f47c2',
          name: 'Fabric',
          code: 'FAB002',
          createdAt: '2024-10-04T18:03:50.032Z',
          updatedAt: '2024-10-04T18:03:50.032Z',
          deletedAt: null
        }
      }
    },
    {
      id: '3a46c53e-f1f6-44b5-991a-12c574a7f4c7',
      materialId: 'fabric-5502',
      name: 'Silk Blend Fabric',
      code: 'SILK123',
      packUnit: 'Bundle',
      uomPerPack: 5,
      packedWidth: 100,
      packedLength: 45,
      packedHeight: 25,
      packedWeight: 15,
      createdAt: '2024-10-05T08:22:13.483Z',
      updatedAt: '2024-10-05T08:22:13.483Z',
      deletedAt: null,
      material: {
        id: '5502b487-d1c2-6413-933f-7a56985f1c98',
        materialTypeId: 'c67d4836-g52d-7g2f-b76g-17d63e65g73e',
        uomId: '5e7f3c6b-e2b7-6f4d-a0f3-3f2923f4b92e',
        name: 'Silk Blend',
        code: 'SILK001',
        reorderLevel: 3,
        createdAt: '2024-10-05T08:03:50.032Z',
        updatedAt: '2024-10-05T08:03:50.032Z',
        deletedAt: null,
        uom: {
          id: '5e7f3c6b-e2b7-6f4d-a0f3-3f2923f4b92e',
          name: 'm',
          createdAt: '2024-10-05T08:04:22.609Z',
          updatedAt: '2024-10-05T08:04:22.609Z',
          deletedAt: null
        },
        materialType: {
          id: 'c67d4836-g52d-7g2f-b76g-17d63e65g73e',
          name: 'Fabric',
          code: 'FAB003',
          createdAt: '2024-10-05T08:03:50.032Z',
          updatedAt: '2024-10-05T08:03:50.032Z',
          deletedAt: null
        }
      }
    },
    {
      id: '4b57d63f-g3g8-54g6-a2g5-27g785h6f85h',
      materialId: 'fabric-5503',
      name: 'Linen Fabric',
      code: 'LINEN456',
      packUnit: 'Roll',
      uomPerPack: 3,
      packedWidth: 120,
      packedLength: 60,
      packedHeight: 35,
      packedWeight: 28,
      createdAt: '2024-10-06T12:30:45.123Z',
      updatedAt: '2024-10-06T12:30:45.123Z',
      deletedAt: null,
      material: {
        id: '5503g698-h4h9-7324-c45i-8a67985g2d7e',
        materialTypeId: 'd78g5947-i63h-8h3f-c98j-28e73h84g94i',
        uomId: '6f8g3d7e-h3h8-7f5h-b1h4-4g4924g5d04f',
        name: 'Linen',
        code: 'LINEN001',
        reorderLevel: 7,
        createdAt: '2024-10-06T12:10:00.000Z',
        updatedAt: '2024-10-06T12:10:00.000Z',
        deletedAt: null,
        uom: {
          id: '6f8g3d7e-h3h8-7f5h-b1h4-4g4924g5d04f',
          name: 'm',
          createdAt: '2024-10-06T12:10:22.609Z',
          updatedAt: '2024-10-06T12:10:22.609Z',
          deletedAt: null
        },
        materialType: {
          id: 'd78g5947-i63h-8h3f-c98j-28e73h84g94i',
          name: 'Fabric',
          code: 'FAB004',
          createdAt: '2024-10-06T12:10:50.032Z',
          updatedAt: '2024-10-06T12:10:50.032Z',
          deletedAt: null
        }
      }
    }
  ]
};
