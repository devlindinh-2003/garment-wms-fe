import PieChartComponent from '@/components/common/PieChart';
import ProgressList from './ProgressList';
import Colors from '@/constants/color';
import { useGetPurchaseOrderStatistic } from '@/hooks/useGetPurchaseOrderStatistic';
import Loading from '@/components/common/Loading';
import HalfPieChartComponent from '@/components/common/HalfPieChart';

const ProgressChart = () => {
  const colors = [Colors.blue[500], Colors.green[500], Colors.red[500]];
  const { data: statisticData } = useGetPurchaseOrderStatistic();
  const statistics = statisticData?.data;
  console.log(statistics);
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
      <div className="grid grid-cols-[2fr_1fr]">
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
        {statistics ? (
          <ProgressList statistics={statistics} />
        ) : (
          <div>
            <Loading />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProgressChart;
