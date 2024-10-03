import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
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
  plannedQuantity: z
    .number()
    .positive({ message: 'Planned quantity must be a positive number' }),
  actualQuantity: z
    .number()
    .positive({ message: 'Actual quantity must be a positive number' }),
});

interface MaterialFormProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  material: any; // Selected material to edit
  details: any[];
  setDetails: React.Dispatch<React.SetStateAction<any[]>>;
}

const EditMaterialForm = ({ isOpen, onOpenChange, material, details, setDetails }: MaterialFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      material: '',
      plannedQuantity: 0,
      actualQuantity: 0,
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (material) {
      form.reset({
        material: material.materialName,
        plannedQuantity: material.plannedQuantity || 0,
        actualQuantity: material.actualQuantity || 0,
      });
    } else {
      form.reset(); // Clear form if no material is passed
    }
  }, [material, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const materialData = {
      ...material,
      materialName: values.material,
      plannedQuantity: values.plannedQuantity,
      actualQuantity: values.actualQuantity,
    };

    const index = details.findIndex(item => item.materialId === material.materialId);
    if (index !== -1) {
      const updatedDetails = [...details];
      updatedDetails[index] = { ...updatedDetails[index], ...materialData };
      setDetails(updatedDetails);
    }

    console.log('Updated Details:', details);
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
          <DialogTitle>Edit Material</DialogTitle>
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
                      onChange={(e) => onChange(Number(e.target.value))}
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
                      onChange={(e) => onChange(Number(e.target.value))}
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

export default EditMaterialForm;
