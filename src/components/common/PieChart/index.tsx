import { Badge } from '@/components/ui/Badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/Table';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function PieChartComponent() {
  return (
    <div className="flex justify-center  items-center p-6">
      <div className="flex justify-center">
        <PieChart width={500} height={550}>
          <Pie
            data={data}
            cx={250}
            cy={250}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={180}
            fill="#8884d8"
            dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            iconType="circle"
            layout="vertical"
            verticalAlign="bottom"
            height={80}
            align="center"
          />
        </PieChart>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left w-36">Label</TableHead>
              <TableHead className="text-left w-24">Value</TableHead>
              <TableHead className="text-left">%</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((entry, index) => (
              <TableRow key={index}>
                <TableCell className="text-left  py-2">
                  <Badge style={{ backgroundColor: COLORS[index % COLORS.length] }}>
                    {entry.name}
                  </Badge>
                </TableCell>
                <TableCell className="text-left">{entry.value}</TableCell>
                <TableCell className="text-left">
                  {((entry.value / 72) * 100).toFixed(1)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
