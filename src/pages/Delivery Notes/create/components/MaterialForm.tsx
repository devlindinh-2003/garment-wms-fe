import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/Dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select';
import { Button } from '@/components/ui/button';
import { details } from './data';

type Props = {};
const formSchema = z.object({
  material: z.string({
    required_error: 'Please select an email to display.'
  }),
  plannedQuantity: z.string().min(1, { message: 'Planned quantity is empty' }),
  actualQuantity: z.string().min(1, { message: 'Planned quantity is empty' })
});

interface MaterialFormProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  material: any;
}
const MaterialForm = ({ isOpen, onOpenChange, material }: MaterialFormProps) => {
    const [selectedMaterial, setSelectedMaterial] = useState<any | null>(null);
// Create and Update Functions
const createMaterial = (newMaterial: any) => {
  details.push(newMaterial);
};

const updateMaterial = (updatedMaterial: any) => {
  const index = details.findIndex(
    (item) => item.materialId === updatedMaterial.materialId
  );
  if (index !== -1) {
    details[index] = updatedMaterial;
  }
};

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      material: '',
      plannedQuantity: '',
      actualQuantity: ''
    },
    mode: 'onChange'
  });
  const handleMaterialChange = (materialName: string) => {
    const selected = details.find(item => item.materialName === materialName);
    setSelectedMaterial(selected || null);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const materialData = {
      ...selectedMaterial, 
      materialName: values.material,
      plannedQuantity: Number(values.plannedQuantity),
      actualQuantity: Number(values.actualQuantity),
    };

    if (selectedMaterial) {
      
      updateMaterial(materialData);
    } else {
      
      const newMaterial = {
        materialId: (details.length + 1).toString(), // Generate new ID
        SKU: `SKU${details.length + 1}`, // Generate new SKU
        UOM: 'UOM', // Add default UOM
        ...materialData
      };
      createMaterial(newMaterial);
    }

    console.log('Updated Details:', details); // Check updated details
    onCloseDialog(); // Close the dialog after submit
  };

  const onCloseDialog = () => {
    form.reset(); // Reset form fields
    setSelectedMaterial(null); // Clear selected material
    onOpenChange(false); // Close the dialog
  };
  return (
    <Dialog open={isOpen} onOpenChange={onCloseDialog}>
      {/* <DialogTrigger asChild> */}
        {/* <Button className='my-3' size="sm">Add</Button> */}
      {/* </DialogTrigger> */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {material ? 'Update the choosen material' : 'Choose material'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="material"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material</FormLabel>
                  <Select onValueChange={(value) => {
                      field.onChange(value);
                      handleMaterialChange(value); // Update material info on change
                    }}
                     defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem> */}
                      {details.map((item, index) => (
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
             {/* Display selected material details */}
             {selectedMaterial && (
              <div className="font-primary text-sm space-y-2">
                <p><strong>Material ID:</strong> {selectedMaterial.materialId}</p>
                <p><strong>SKU:</strong> {selectedMaterial.SKU}</p>
                <p><strong>UOM:</strong> {selectedMaterial.UOM}</p>
              </div>
            )}
            <FormField
              name="plannedQuantity"
              control={form.control}
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Planned Quantity</FormLabel>
                  <FormControl>
                    <Input type='number' value={value} onChange={(value) => onChange(value)} />
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
                    <Input type='number' value={value} onChange={(value) => onChange(value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
        <Button
            type="button"

            onClick={form.handleSubmit(onSubmit)}
          >
          
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MaterialForm;
