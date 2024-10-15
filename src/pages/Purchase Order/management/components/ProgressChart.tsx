import { useState } from 'react';
import ProgressList from './ProgressList';
import Colors from '@/constants/color';
import { useGetPurchaseOrderStatistic } from '@/hooks/useGetPurchaseOrderStatistic';
import HalfPieChartComponent from '@/components/common/HalfPieChart';
import ChartSkeleton from '@/components/common/ChartSkeleton';
import DialogStatusTable from './DialogStatusTable';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/Dialog';
import { Badge } from '@/components/ui/Badge';

const getColorClasses = (status: string) => {
  switch (status) {
    case 'IN_PROGRESS':
      return 'bg-blue-500';
    case 'CANCELLED':
      return 'bg-red-500';
    case 'FINISHED':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

const ProgressChart = () => {
  const colors = [Colors.blue[500], Colors.green[500], Colors.red[500]];
  const { data: statisticData, isPending, isFetching } = useGetPurchaseOrderStatistic();
  const statistics = statisticData?.data;
  const isLoadingData = isPending || isFetching;

  // State for dialog management
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const [buttonBg, setButtonBg] = useState<string>('bg-blue-500');

  const chartData = statistics
    ? [
        { name: 'In Progress orders', value: statistics.inProgress },
        { name: 'Finished orders', value: statistics.finished },
        { name: 'Cancelled orders', value: statistics.cancelled }
      ]
    : [];

  // Handle view details for dialog
  const handleViewDetails = (status: string, value: number, buttonBg: string) => {
    setSelectedStatus(status);
    setSelectedValue(value);
    setButtonBg(buttonBg);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedStatus(null);
    setSelectedValue(0);
  };

  return (
    <>
      <section className="px-6 pt-6 pb-8 w-auto bg-white rounded-xl shadow-md border">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primaryLight">Purchase Order Report</h1>
        </div>

        {isLoadingData ? (
          <div className="flex justify-center">
            <ChartSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-[2fr_1fr] gap-8">
            <HalfPieChartComponent
              data={chartData}
              colors={colors}
              width={600}
              height={650}
              innerRadius={85}
              outerRadius={280}
              labelType="value"
              showLegend={false}
            />
            <ProgressList statistics={statistics} onViewDetails={handleViewDetails} />
          </div>
        )}
      </section>

      {selectedStatus && (
        <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="w-full max-w-[90%] h-[90vh] lg:max-w-screen-lg p-6 mx-auto">
            <DialogTitle className="text-2xl font-semibold flex items-center gap-3">
              <span>Viewing purchase orders with status:</span>
              <Badge className={`${getColorClasses(selectedStatus)} text-white mt-1`}>
                {selectedStatus.replace('_', ' ')}
              </Badge>
            </DialogTitle>

            {/* Pass the selectedStatus to DialogStatusTable to filter the data */}
            <div className=" -mt-[3rem] overflow-y-auto h-[65vh]">
              <DialogStatusTable selectedStatus={selectedStatus} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ProgressChart;
