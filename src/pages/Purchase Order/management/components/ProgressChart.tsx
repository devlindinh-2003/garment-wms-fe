import ProgressList from './ProgressList';
import Colors from '@/constants/color';
import { useGetPurchaseOrderStatistic } from '@/hooks/useGetPurchaseOrderStatistic';
import HalfPieChartComponent from '@/components/common/HalfPieChart';
import ChartSkeleton from '@/components/common/ChartSkeleton';

const ProgressChart = () => {
  const colors = [Colors.blue[500], Colors.green[500], Colors.red[500]];
  const { data: statisticData, isPending, isFetching } = useGetPurchaseOrderStatistic();
  const statistics = statisticData?.data;
  const isLoadingData = isPending || isFetching;

  const chartData = statistics
    ? [
        { name: 'In Progress orders', value: statistics.inProgress },
        { name: 'Finished orders', value: statistics.finished },
        { name: 'Cancelled orders', value: statistics.cancelled }
      ]
    : [];

  return (
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
          <ProgressList statistics={statistics} />
        </div>
      )}
    </section>
  );
};

export default ProgressChart;
