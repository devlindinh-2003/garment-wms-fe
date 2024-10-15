import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@/components/ui/Dialog';
import { EyeOpenIcon } from '@radix-ui/react-icons';

interface DialogStatusTableProps {
  status: string;
  value: number;
  buttonBg: string;
}

const DialogStatusTable: React.FC<DialogStatusTableProps> = ({ status, value, buttonBg }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={`text-white ${buttonBg} text-sm flex items-center gap-1 px-4 py-1`}>
          <EyeOpenIcon fontSize={12} />
          View
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Details for {status.toLowerCase().replace('_', ' ')}</DialogTitle>
        <DialogDescription>
          You are viewing details for the {status.toLowerCase().replace('_', ' ')} purchase orders.
        </DialogDescription>
        <p className="mt-4">Total Orders: {value}</p>
        <DialogClose asChild>
          <Button className="mt-4">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default DialogStatusTable;
