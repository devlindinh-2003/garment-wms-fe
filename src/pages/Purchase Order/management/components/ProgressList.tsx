import { Loader2, CheckCircle, XCircle, FileText } from 'lucide-react';
import { PurchaseOrderStatus } from '@/enums/purchaseOrderStatus';
import React from 'react';
import { Button } from '@/components/ui/button';

interface StatusCardProps {
  status?: PurchaseOrderStatus;
  value: number;
  label?: string;
  onViewDetails: (status: PurchaseOrderStatus, value: number, buttonBg: string) => void; // Add onViewDetails prop
}

interface ProgressListProps {
  statistics: {
    total: number;
    inProgress: number;
    finished: number;
    cancelled: number;
  };
  onViewDetails: (status: PurchaseOrderStatus, value: number, buttonBg: string) => void; // Add onViewDetails prop
}

const getColorClasses = (status?: PurchaseOrderStatus) => {
  switch (status) {
    case PurchaseOrderStatus.IN_PROGRESS:
      return { bg: 'bg-blue-100', text: 'text-blue-900', buttonBg: 'bg-blue-500' };
    case PurchaseOrderStatus.CANCELLED:
      return { bg: 'bg-red-100', text: 'text-red-900', buttonBg: 'bg-red-500' };
    case PurchaseOrderStatus.FINISHED:
      return { bg: 'bg-green-100', text: 'text-green-900', buttonBg: 'bg-green-500' };
    default:
      return { bg: 'bg-gray-200', text: 'text-gray-900', buttonBg: 'bg-gray-500' };
  }
};

const getIcon = (status?: PurchaseOrderStatus) => {
  switch (status) {
    case PurchaseOrderStatus.IN_PROGRESS:
      return <Loader2 className="text-blue-500 w-6 h-6 animate-spin" />;
    case PurchaseOrderStatus.CANCELLED:
      return <XCircle className="text-red-500 w-6 h-6" />;
    case PurchaseOrderStatus.FINISHED:
      return <CheckCircle className="text-green-500 w-6 h-6" />;
    default:
      return <FileText className="text-gray-500 w-6 h-6" />;
  }
};

const StatusCard: React.FC<StatusCardProps> = ({ status, value, label, onViewDetails }) => {
  const { bg, text, buttonBg } = getColorClasses(status);

  return (
    <div className={`${bg} p-4 rounded-lg shadow-md w-96 h-32 flex flex-col justify-between`}>
      <div className="flex justify-between">
        <div>{getIcon(status)}</div>
        {status && (
          <Button
            className={`text-white ${buttonBg} text-sm flex items-center gap-1 px-4 py-1`}
            onClick={() => onViewDetails(status, value, buttonBg)}>
            View
          </Button>
        )}
      </div>

      <div className="text-center flex flex-col gap-3">
        <h2 className={`text-4xl font-bold ${text}`}>{value}</h2>
        <p className="text-sm text-slate-400">
          <span className="capitalize font-semibold">
            {label || status?.toLowerCase().replace('_', ' ')}
          </span>{' '}
          purchase orders
        </p>
      </div>
    </div>
  );
};

const ProgressList: React.FC<ProgressListProps> = ({ statistics, onViewDetails }) => {
  return (
    <div className="flex flex-col gap-5">
      <StatusCard value={statistics.total} label="Total Orders" onViewDetails={onViewDetails} />
      <StatusCard
        status={PurchaseOrderStatus.IN_PROGRESS}
        value={statistics.inProgress}
        onViewDetails={onViewDetails}
      />
      <StatusCard
        status={PurchaseOrderStatus.FINISHED}
        value={statistics.finished}
        onViewDetails={onViewDetails}
      />
      <StatusCard
        status={PurchaseOrderStatus.CANCELLED}
        value={statistics.cancelled}
        onViewDetails={onViewDetails}
      />
    </div>
  );
};

export default ProgressList;
