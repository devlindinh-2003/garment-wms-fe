import PieChartComponent from '@/components/common/PieChart';
import ProgressList from './ProgressList';
import Colors from '@/constants/color';

const ProgressChart = () => {
  const data = [
    { name: 'In Progress orders', value: 25 },
    { name: 'Finished orders', value: 30 },
    { name: 'Cancelled  orders', value: 10 }
  ];

  const colors = [Colors.blue[500], Colors.green[500], Colors.red[500]];
  return (
    <section className="px-6 pt-6 pb-8 w-auto bg-white rounded-xl shadow-md border">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primaryLight">Purchase Order Report</h1>
      </div>
      <div className="flex items-center justify-center gap-8">
        <PieChartComponent
          data={data}
          colors={colors}
          width={600}
          height={600}
          innerRadius={80}
          outerRadius={200}
          labelType="value"
        />
        <ProgressList />
      </div>
    </section>
  );
};

export default ProgressChart;
