import PieChartComponent from '@/components/common/PieChart';
import ProgressList from './ProgressList';

const ProgressChart = () => {
  return (
    <section className="px-6 pt-6 pb-8 w-auto bg-white rounded-xl shadow-md border">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primaryLight">Purchase Order Statistics</h1>
      </div>
      <div className="flex items-center justify-center gap-8">
        <PieChartComponent />
        <ProgressList />
      </div>
    </section>
  );
};

export default ProgressChart;
