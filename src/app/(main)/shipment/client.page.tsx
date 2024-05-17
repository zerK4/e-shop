"use client";

import { Card } from "@/components/ui/card";
import anime from "animejs";
import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import PaymentForm from "@/components/paymentForm";
import { useRouter } from "next/navigation";

function ClientPage({ paymentIntent }: { paymentIntent: string }) {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
    router.push(`/shipment?payment_intent_client_secret=${paymentIntent}`);
    const tl = anime.timeline();

    tl.add({
      targets: "#shipment-page",
      translateX: ["200vw", 0],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeOutExpo",
    });
  }, []);

  return (
    <Card id='shipment-page' className='h-full mx-auto'>
      <div className='flex gap-4 flex-col md:flex-row w-full h-full'>
        <form className='space-y-6 flex-1 py-4 px-4 sm:px-6 lg:px-8'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50'>
              Shipping Information
            </h1>
            <p className='mt-2 text-gray-500 dark:text-gray-400'>
              Please enter your shipping details.
            </p>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input id='name' placeholder='John Doe' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='address'>Address</Label>
              <Input id='address' placeholder='123 Main St' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='city'>City</Label>
              <Input id='city' placeholder='San Francisco' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='state'>State</Label>
              <Input id='state' placeholder='CA' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='zip'>Zip Code</Label>
              <Input id='zip' placeholder='94103' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='country'>Country</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Select country' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='us'>United States</SelectItem>
                  <SelectItem value='ca'>Canada</SelectItem>
                  <SelectItem value='mx'>Mexico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <h2 className='text-xl font-bold tracking-tight text-gray-900 dark:text-gray-50'>
              Shipping Method
            </h2>
            <div className='mt-4 space-y-4'>
              <RadioGroup defaultValue='standard' name='shipping-method'>
                <div className='flex items-center'>
                  <RadioGroupItem id='standard' value='standard' />
                  <Label
                    className='ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300'
                    htmlFor='standard'
                  >
                    Standard Shipping
                  </Label>
                </div>
                <div className='flex items-center'>
                  <RadioGroupItem id='expedited' value='expedited' />
                  <Label
                    className='ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300'
                    htmlFor='expedited'
                  >
                    Expedited Shipping
                  </Label>
                </div>
                <div className='flex items-center'>
                  <RadioGroupItem id='overnight' value='overnight' />
                  <Label
                    className='ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300'
                    htmlFor='overnight'
                  >
                    Overnight Shipping
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </form>
        <div className='min-h-full bg-background border-l py-4 px-4 sm:px-6 lg:px-8 rounded-b-md md:rounded-r-md md:rounded-bl-none'>
          <div className='h-full'>
            <PaymentForm />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ClientPage;
