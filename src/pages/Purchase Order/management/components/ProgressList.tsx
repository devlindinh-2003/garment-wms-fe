import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Colors from '@/constants/color';
import { MoveUpRight, MoveDownRight } from 'lucide-react';
import React from 'react';

interface ProgressItemProps {
  title: string;
  value: number;
  progressValue: number;
  percentageChange: number;
  isIncrease: boolean;
}

const ProgressItem: React.FC<ProgressItemProps> = ({
  title,
  value,
  progressValue,
  percentageChange,
  isIncrease
}) => {
  return (
    <div className="px-4 py-3 bg-white w-full rounded-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-lg uppercase">{title}</h1>
        <Button className="text-sm">View</Button>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        <span className="text-3xl font-semibold ">{value}</span>
        <Progress value={progressValue} />
        <span className="flex items-center gap-2 text-sm text-gray-500">
          {isIncrease ? (
            <>
              <MoveUpRight color={Colors.success} size={15} />
              {`${percentageChange}% increase from last month`}
            </>
          ) : (
            <>
              <MoveDownRight color={Colors.error} size={15} />
              {`${percentageChange}% decrease from last month`}
            </>
          )}
        </span>
      </div>
    </div>
  );
};

const ProgressList: React.FC = () => {
  return (
    <div className="flex items-center space-x-6 w-full">
      <ProgressItem
        title="Total Orders"
        value={23}
        progressValue={33}
        percentageChange={18}
        isIncrease={true}
      />
      <ProgressItem
        title="Completed Orders"
        value={15}
        progressValue={60}
        percentageChange={5}
        isIncrease={false}
      />
      <ProgressItem
        title="Pending Orders"
        value={8}
        progressValue={45}
        percentageChange={10}
        isIncrease={true}
      />
    </div>
  );
};

export default ProgressList;
