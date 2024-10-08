import { useMediaQuery } from 'usehooks-ts';
import ProcessIcon from './ProcessIcon';

type Props = {
  currentStatus: string;
};

const statusOrder = [
  "ARRIVED",
  "INSPECTING",
  "INSPECTED",
  "PENDING",
  "CANCELED",
  "REJECTED",
  "APPROVED",
  "IMPORTING",
  "IMPORTED",
];

const dataIcon = [
  {
    title: 'At Depot',
    state: ['ARRIVED'],

  },
  {
    title: 'In Inspection',
    state: ['INSPECTING', 'INSPECTED'],

  },
  {
    title: 'Waiting for approval',
    state: ['PENDING', 'CANCELED', 'REJECTED', 'APPROVED'],

  },
  {
    title: 'Import To Warehouse',
    state: ['IMPORTING', 'IMPORTED'],
  }
];

const Process = ({ currentStatus }: Props) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  
  const getDisplayStatus = (itemStates: string[]) => {
    const currentStatusIndex = statusOrder.indexOf(currentStatus);

    // Go through the states and determine which should be displayed
    for (let i = itemStates.length - 1; i >= 0; i--) {
      const status = itemStates[i];
      const statusIndex = statusOrder.indexOf(status);
      // If the current status is after this step, show it
      if (statusIndex <= currentStatusIndex) {
        return status;
      }
    }

    // If no earlier status matches, return "NOT YET"
    return "NOT YET";
  };


  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="font-primary font-bold text-2xl mb-4">Process</div>
      {isDesktop ? (
        <ol className="flex items-center w-full text-xs text-gray-900 font-medium sm:text-base">
          {dataIcon.map((item, index) => (
            <ProcessIcon
              key={index}
              index={index}
              title={item.title}
              state={item.state}
              displayStatus={getDisplayStatus(item.state)} // Calculate display status for each step
              isDone={statusOrder.indexOf(currentStatus) >= statusOrder.indexOf(item.state[item.state.length - 1])}
              totalSteps={dataIcon.length}
            />
          ))}
        </ol>
      ) : (
        <ol className="overflow-hidden space-y-8">
          {dataIcon.map((item, index) => (
            <ProcessIcon
              key={index}
              index={index}
              title={item.title}
              state={item.state}
              displayStatus={getDisplayStatus(item.state)} // Calculate display status for each step
              isDone={statusOrder.indexOf(currentStatus) >= statusOrder.indexOf(item.state[item.state.length - 1])}
              totalSteps={dataIcon.length}
            />
          ))}
        </ol>
      )}
    </div>
  );
};

export default Process;
