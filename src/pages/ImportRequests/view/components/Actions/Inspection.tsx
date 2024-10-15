import React, { useEffect, useState } from 'react';
import { Chart } from './Chart';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi
} from '@/components/ui/Carousel';
import WarehouseApproval from './ImportRequestApproval';
import ImportRequestCreation from './ImportRequestCreation';
import WarehouseStaffAssignment from './ImportRequestStaffAssignment';

interface Props {
  selectedStep: number | null;
  setSelectedStep: React.Dispatch<React.SetStateAction<number | null>>;
  currentStatus: string;
}

const InspectionStep: React.FC<Props> = ({ selectedStep, setSelectedStep, currentStatus }) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null); // Store carousel API

  // Step actions data (can be dynamic)
  const stepsActions = [
    {
      title: '123',
      content: <ImportRequestCreation />
    },
    {
      title: 'Chart Report',
      content: <Chart />
    },
    // {
    //   title: 'No Inspection Report',
    //   content: (
    //     <div className="w-full flex items-center justify-center flex-col">
    //       <img src={empty} className="w-[250px] h-[250px]" />
    //       <h2 className="font-bold text-xl text-gray-700">No Inspection Report Created</h2>
    //     </div>
    //   )
    // },

    {
      title: 'Pending Approval',
      content: (
        <WarehouseApproval
          requestId="123"
          managerEmail="123"
          managerName="Nguyen Duc Bao"
          currentStatus={currentStatus}
        />
      )
    },
    {
      title: 'Pending Approval',
      content: (
        <WarehouseStaffAssignment
          currentStatus={currentStatus}
          requestId="123"
          managerEmail="123"
          managerName="Nguyen Duc Bao"
        />
      )
    }
  ];

  // Effect to sync the carousel with the selectedStep
  useEffect(() => {
    if (carouselApi && selectedStep !== null) {
      carouselApi.scrollTo(selectedStep); // Sync carousel with selectedStep
    }
  }, [selectedStep, carouselApi]);

  // Callback when carousel slide changes
  const onSlideChange = () => {
    if (carouselApi) {
      const newIndex = carouselApi.selectedScrollSnap(); // Get the current slide index
      setSelectedStep(newIndex); // Update selectedStep based on carousel position
    }
  };

  // Effect to listen to carousel's slide change events
  useEffect(() => {
    if (carouselApi) {
      carouselApi.on('select', onSlideChange); // Listen to carousel's slide changes

      return () => {
        carouselApi.off('select', onSlideChange); // Cleanup the listener on unmount
      };
    }
  }, [carouselApi]);

  return (
    <div className="flex items-center justify-center">
      <Carousel className="w-[90%] h-[80%]" setApi={setCarouselApi}>
        <CarouselContent>
          {stepsActions.map((action, index) => (
            <CarouselItem key={index}>
              <div className="w-full h-full">
                <div className="flex  items-center justify-center h-full ">{action.content}</div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default InspectionStep;
