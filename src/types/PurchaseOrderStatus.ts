export enum PurchaseOrderStatus {
  IN_PROGESS = 'IN_PROGESS',
  CANCELLED = 'CANCELLED',
  FINISHED = 'FINISHED'
}

export const PurchaseOrderStatusLabels: Record<PurchaseOrderStatus, string> = {
  [PurchaseOrderStatus.IN_PROGESS]: 'In Progress',
  [PurchaseOrderStatus.CANCELLED]: 'Cancelled',
  [PurchaseOrderStatus.FINISHED]: 'Finished'
};
