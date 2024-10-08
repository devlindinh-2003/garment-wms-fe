import { MaterialVariant } from './MaterialVariant';

export interface PoDeliveryDetail {
  id: string;
  poDeliveryId: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  quantityByPack: number;
  materialVariantId: string;
  expiredDate: string | null;
  totalAmount: number;
  materialVariant: MaterialVariant;
}
