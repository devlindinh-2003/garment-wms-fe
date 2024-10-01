import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/Popover"
  import { Calendar } from "@/components/ui/Calendar"
  import { format } from "date-fns"
import { cn } from '@/lib/utils';
import { CalendarIcon } from "@radix-ui/react-icons"


type Props = {}

const purchaseOrder = ['Silk', 'Shadcn', 'GoodButton', 'KhaiSilk'] as const;
const purchaseOrderBatch = ['Silk', 'Shadcn', 'GoodButton', 'KhaiSilk'] as const;

const formSchema = z.object({
    purchaseOrder: z.string().min(1, "Please select a supplier."),
  purchaseOrderBatch: z.string().min(1, "Please select a supplier batch."),
  deliveryDate: z.date({
    required_error: "A date of delivery is required."
  }),
  productionPlan: z.string().min(1, "Supplier mobile number is required."),
});
interface DeliveryFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
}
const DeliveryForm: React.FC<DeliveryFormProps> = ({ form, onSubmit }) => {
   
  return (
    <div className="pr-4 pb-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full grid grid-cols-2 gap-4 justify-center items-center">
          <FormField
            control={form.control}
            name="purchaseOrder"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className="text-sm">Purchase Order:</FormLabel>
                <FormControl>
                  <Select {...field} value={field.value || ''} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {purchaseOrder.map((supplier) => (
                        <SelectItem value={supplier}>{supplier}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
          control={form.control}
          name="deliveryDate"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel>Date of delivery</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar 
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="purchaseOrderBatch"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className="text-sm">Purchase Order batch</FormLabel>
                <FormControl>
                <Select {...field} value={field.value || ''} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {purchaseOrderBatch.map((supplier) => (
                        <SelectItem value={supplier}>{supplier}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="productionPlan"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel className="text-sm">Production plan</FormLabel>
                <FormControl>
                <Select {...field} value={field.value || ''} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {purchaseOrder.map((supplier) => (
                        <SelectItem value={supplier}>{supplier}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
        </form>
      </Form>
    </div>
  )
}

export default DeliveryForm