/* eslint-disable react/no-array-index-key */
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useService } from '@/hooks/use-service';
import type { PatientData } from '@/lib/interfaces';
import { capitalizeFirstLetter, cn, getStatusColorClass } from '@/lib/utils';
import type { OrderType } from '@/lib/zod/schema';
import { OrderSchema } from '@/lib/zod/schema';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from './ui/sheet';
import { TableCell, TableRow } from './ui/table';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';

interface Props {
  row: PatientData;
  index: number;
}

const OrderRecord = ({ index, row }: Props) => {
  const [open, setOpen] = useState(false);

  //   HOOKS
  const queryClient = useQueryClient();
  const { updateSingleOrderMutation } = useService();
  const { updateSingleOrder } = updateSingleOrderMutation();

  const form = useForm<OrderType>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      doctor_phone: row.doctor_phone,
      patient_name: row.patient_name,
      patient_phone: row.patient_phone,
      status: row.status,
      notes: ''
    }
  });

  const onSubmit = (values: OrderType) => {
    updateSingleOrder.mutate(
      {
        id: row.id,
        payload: values
      },
      {
        onSuccess: () => {
          toast({
            className: 'bg-[#3798dc] text-white',
            description: 'Record Updated'
          });
          queryClient.invalidateQueries({ queryKey: ['orders'] });
          setOpen(false);
        },
        onError: () => {
          toast({
            variant: 'destructive',
            description: 'Something Went Wrong'
          });
        }
      }
    );
  };

  return (
    <>
      <TableRow className={`${cn('', index % 2 === 0 && 'bg-accent')}`}>
        {Object.entries(row).map(
          ([key, value], idx) =>
            key !== 'notes' && (
              <TableCell key={`${row.id}-${idx}`} className="cursor-pointer" onClick={() => setOpen(true)}>
                {key === 'status' ? (
                  <Badge className={`text-xs text-white ${getStatusColorClass(value)}`} variant="secondary">
                    {capitalizeFirstLetter(value)}
                  </Badge>
                ) : (
                  value
                )}
              </TableCell>
            )
        )}
      </TableRow>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          onPointerDownOutside={(e) => {
            e.preventDefault();
          }}
        >
          <SheetHeader>
            <SheetTitle>Edit Order #{row.id}</SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <FormField
              control={form.control}
              name="patient_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="mt-6 flex flex-col gap-2">
                      <Label htmlFor="patient_name">Patient Name</Label>
                      <Input {...field} type="text" id="patient_name" placeholder="Enter Patient Name" />
                    </div>
                  </FormControl>
                  <FormMessage className="flex justify-start" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patient_phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="mt-6 flex flex-col gap-2">
                      <Label htmlFor="patient_phone">Patient Phone</Label>
                      <Input {...field} type="text" id="patient_phone" placeholder="Enter Patient Phone" />
                    </div>
                  </FormControl>
                  <FormMessage className="flex justify-start" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="doctor_phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="mt-6 flex flex-col gap-2">
                      <Label htmlFor="doctor_phone">Doctor Phone</Label>
                      <Input {...field} type="text" id="doctor_phone" placeholder="Enter Doctor Phone" />
                    </div>
                  </FormControl>
                  <FormMessage className="flex justify-start" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="my-4">
                      <Label htmlFor="status">Status</Label>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="declined">Declined</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage className="flex justify-start" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="mb-4 mt-6">
                      <Textarea {...field} placeholder="Enter Notes (Optional)" className="resize-none" />
                    </div>
                  </FormControl>
                  <FormMessage className="flex justify-start" />
                </FormItem>
              )}
            />
          </Form>
          <SheetFooter className="relative">
            <Button
              className="absolute left-0 flex items-center gap-1 bg-[#3798dc] text-white hover:bg-[#3798dc]"
              onClick={() => form.handleSubmit(onSubmit)()}
            >
              <Check />
              <p>Save and Close</p>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default OrderRecord;
