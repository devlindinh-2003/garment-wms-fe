export enum PurchaseOrderDeliveryStatus {
  PENDING = 'PENDING',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED'
}

export const PurchaseOrderDeliveryStatusLabels: Record<PurchaseOrderDeliveryStatus, string> = {
  [PurchaseOrderDeliveryStatus.PENDING]: 'Pending',
  [PurchaseOrderDeliveryStatus.CANCELLED]: 'Cancelled',
  [PurchaseOrderDeliveryStatus.FINISHED]: 'Finished'
};
