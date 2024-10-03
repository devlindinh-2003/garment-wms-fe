import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Button } from '@/components/ui/button';
import { details as detailData } from './data';

const formSchema = z.object({
  material: z.string({
    required_error: 'Please select a material to display.',
  }),
  plannedQuantity: z.string().min(1, { message: 'Planned quantity is empty' }),
  actualQuantity: z.string().min(1, { message: 'Actual quantity is empty' }),
});

interface MaterialFormProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  details: any[];
  setDetails: React.Dispatch<React.SetStateAction<any[]>>;
}

const MaterialForm = ({ isOpen, onOpenChange, details, setDetails }: MaterialFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      material: '',
      plannedQuantity: '',
      actualQuantity: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newMaterial = {
      materialId: (details.length + 1).toString(), // Generate new ID
      SKU: `SKU${details.length + 1}`, // Generate new SKU
      UOM: 'UOM', // Add default UOM
      materialName: values.material,
      plannedQuantity: Number(values.plannedQuantity),
      actualQuantity: Number(values.actualQuantity),
    };
    
    setDetails(prevDetails => [...prevDetails, newMaterial]); // Add new material to state

    console.log('Added Material:', newMaterial); // Check added material
    onCloseDialog(); // Close the dialog after submit
  };

  const onCloseDialog = () => {
    form.reset(); // Reset form fields
    onOpenChange(false); // Close the dialog
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a New Material</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="material"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a material" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {detailData.map((item, index) => (
                        <SelectItem key={index} value={item.materialName}>
                          {item.materialName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="plannedQuantity"
              control={form.control}
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Planned Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="actualQuantity"
              control={form.control}
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Actual Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="button" onClick={form.handleSubmit(onSubmit)}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MaterialForm;
