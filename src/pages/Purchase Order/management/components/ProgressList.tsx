import { Loader2, CheckCircle, XCircle, FileText } from 'lucide-react';
import { PurchaseOrderStatus } from '@/enums/purchaseOrderStatus';
import React from 'react';

interface StatusCardProps {
  status?: PurchaseOrderStatus;
  value: number;
  label?: string;
}

interface ProgressListProps {
  statistics: {
    total: number;
    inProgress: number;
    finished: number;
    cancelled: number;
  };
}

const StatusCard: React.FC<StatusCardProps> = ({ status, value, label }) => {
  const getColorClasses = (status?: PurchaseOrderStatus) => {
    switch (status) {
      case PurchaseOrderStatus.IN_PROGRESS:
        return { bg: 'bg-blue-100', text: 'text-blue-900' };
      case PurchaseOrderStatus.CANCELLED:
        return { bg: 'bg-red-100', text: 'text-red-900' };
      case PurchaseOrderStatus.FINISHED:
        return { bg: 'bg-green-100', text: 'text-green-900' };
      default:
        return { bg: 'bg-gray-200', text: 'text-gray-900' };
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

  const { bg, text } = getColorClasses(status);

  return (
    <div className={`${bg} p-4 rounded-lg shadow-md w-96 h-32 flex flex-col justify-between`}>
      <div className="text-right">{getIcon(status)}</div>
      <div className="text-center flex flex-col gap-3">
        <h2 className={`text-4xl font-bold ${text}`}>{value}</h2>
        <p className="text-sm text-slate-400 ">
          <span className="capitalize font-semibold">
            {label || status?.toLowerCase().replace('_', ' ')}
          </span>{' '}
          purchase orders
        </p>
      </div>
    </div>
  );
};

const ProgressList: React.FC<ProgressListProps> = ({ statistics }) => {
  return (
    <div className="flex flex-col gap-5">
      <StatusCard value={statistics.total} label="Total Orders" />
      <StatusCard status={PurchaseOrderStatus.IN_PROGRESS} value={statistics.inProgress} />
      <StatusCard status={PurchaseOrderStatus.FINISHED} value={statistics.finished} />
      <StatusCard status={PurchaseOrderStatus.CANCELLED} value={statistics.cancelled} />
    </div>
  );
};

export default ProgressList;
