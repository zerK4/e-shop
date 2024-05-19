"use client";

import { shipmentSchema } from "@/schema/shipmentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePaymentStore } from "@/store/paymentStore";
import { Button } from "./ui/button";
import { ChevronRight, Edit } from "lucide-react";
import { cn } from "@/lib/utils";

export function ShipmentDetailsForm() {
  const { shipmentData } = usePaymentStore();
  const form = useForm<z.infer<typeof shipmentSchema>>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: z.infer<typeof shipmentSchema>) => {
    triggerFormElements(false);
    usePaymentStore.setState({
      shipmentData: data,
    });
  };

  const triggerFormElements = (state: boolean) => {
    const formElements = document.querySelectorAll(".form-element");

    formElements.forEach((element) => {
      element[state ? "removeAttribute" : "setAttribute"]("disabled", "true");
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 flex flex-col w-full'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className=''>
              <FormLabel>Nume</FormLabel>
              <FormControl>
                <Input
                  className='form-element'
                  placeholder='John Doe'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-wrap gap-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='flex-grow basis-[200]'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className='form-element'
                    placeholder='john@email.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem className='flex-grow basis-[200]'>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder='000000000'
                    className='form-element'
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem className=''>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  className='form-element'
                  placeholder='Street x'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-wrap gap-2'>
          <FormField
            control={form.control}
            name='city'
            render={({ field }) => (
              <FormItem className='flex-grow basis-[200]'>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    className='form-element'
                    placeholder='Iasi'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='country'
            render={({ field }) => (
              <FormItem className='flex-grow basis-[200]'>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    className='form-element'
                    placeholder='Romania'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='postalCode'
            render={({ field }) => (
              <FormItem className='flex-grow basis-[200]'>
                <FormLabel>Postal code</FormLabel>
                <FormControl>
                  <Input
                    className='form-element'
                    placeholder='707317'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type={shipmentData ? "button" : "submit"}
          className={cn(
            shipmentData ? "self-end" : "",
            "flex items-center gap-2 ease-in-out duration-300"
          )}
          size={shipmentData ? "icon" : "default"}
          variant={shipmentData ? "outline" : "default"}
          onClick={(e) => {
            shipmentData && e.preventDefault();
            triggerFormElements(true);
            usePaymentStore.setState({
              shipmentData: null,
            });
          }}
        >
          {shipmentData ? (
            <Edit size={16} />
          ) : (
            <span className='flex items-center gap-2'>
              Continue <ChevronRight size={16} />
            </span>
          )}
        </Button>
      </form>
    </Form>
  );
}
