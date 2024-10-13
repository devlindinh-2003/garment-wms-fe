import React, { useEffect, useState } from 'react';
import { Chart } from './Chart';
import empty from '@/assets/images/empty.svg';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi
} from '@/components/ui/Carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Clock, FileSpreadsheet, MoreVertical, User } from 'lucide-react';

interface Props {
  selectedStep: number | null;
  setSelectedStep: React.Dispatch<React.SetStateAction<number | null>>;
}

const InspectionStep: React.FC<Props> = ({ selectedStep, setSelectedStep }) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null); // Store carousel API

  // Step actions data (can be dynamic)
  const stepsActions = [
    {
      title: '123',
      content: (
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Import Request #1234</CardTitle>
            <Badge variant="success">Approved</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Created by John Doe</p>
                <p className="text-xs text-muted-foreground">john.doe@example.com</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4" />
                Created on May 15, 2023 at 14:30 UTC
              </div>
              <div className="flex items-center text-sm">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                5,000 records to be imported
              </div>
              <div className="flex items-center text-sm">
                <User className="mr-2 h-4 w-4" />
                Assigned to Finance Department
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">View Details</Button>
            <Button variant="ghost">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )
    },
    {
      title: 'Chart Report',
      content: <Chart />
    },
    {
      title: 'No Inspection Report',
      content: (
        <div className="w-full flex items-center justify-center flex-col">
          <img src={empty} className="w-[250px] h-[250px]" />
          <h2 className="font-bold text-xl text-gray-700">No Inspection Report Created</h2>
        </div>
      )
    },
    {
      title: 'Pending Approval',
      content: (
        <div>
          <h2>Pending Approval</h2>
        </div>
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
      <Carousel className="w-[90%]" setApi={setCarouselApi}>
        <CarouselContent>
          {stepsActions.map((action, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="flex  items-center justify-center ">{action.content}</div>
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
