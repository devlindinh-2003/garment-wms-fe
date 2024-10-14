import PieChartComponent from '@/components/common/PieChart';

const ProgressChart = () => {
  return (
    <section className=" px-3 pt-3 pb-4 w-auto bg-white rounded-xl shadow-sm border">
      <div>
        <h1 className="text-2xl font-bold text-primaryLight">Purchase Order Statistics</h1>
      </div>
      <div className="flex items-start justify-center space-x-20 ">
        <PieChartComponent />
      </div>
    </section>
  );
};

export default ProgressChart;
