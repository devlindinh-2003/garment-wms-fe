import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

import React from 'react';

type Props = {};

const ImportRequestStatus = (props: Props) => {
  return (
    <div className="w-full lg:w-[90%] h-fit bg-white rounded-xl shadow-sm border-2 sticky top-4 p-4 flex flex-row justify-evenly items-center gap-2
    lg:flex-col lg:justify-center
    ">
      
      <div className="flex flex-col justify-center  items-center gap-1">
      <div className="font-primary font-bold lg:text-xl">Import Request</div>
      <span className="font-primary font-bold lg:text-xl">#1233</span>
        <div className="font-primary text-sm">Assigned to</div>
        <Avatar>
          <AvatarImage src="https://ui.shadcn.com/avatars/01.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="font-primary text-sm">Inspection team</div>
      </div>

      <div className="flex flex-col gap-2 items-start">
        <div className="flex justify-center items-center gap-2 font-primary  text-sm">
          Status: {' '}

            <Badge color="blue">In progress</Badge>
        </div>
        <div className="flex justify-center items-center  gap-2 font-primary text-sm">
          Created at: <div className="font-primary text-xs text-bluePrimary">20/10/2021</div>
        </div>
        <div className="flex justify-center items-center  gap-2 font-primary text-sm">
          Last updated : <div className="font-primary text-xs text-bluePrimary">20/10/2021</div>
        </div>
        <div className="flex justify-center items-center  gap-2 font-primary text-sm">
          Closed at : <div className="font-primary text-xs text-bluePrimary">Not yet</div>
        </div>
      </div>
    </div>
  );
};

export default ImportRequestStatus;
