"use client";

import { Card } from "@/components/ui/card";
import anime from "animejs";
import React, { useEffect } from "react";
import PaymentForm from "@/components/paymentForm";
import { useRouter } from "next/navigation";
import { ShipmentDetailsForm } from "@/components/shipmentDetailsForm";

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
        <div
          id='shipment-form-container'
          className='space-y-6 flex-1 py-4 px-4 sm:px-6 lg:px-8'
        >
          <div>
            <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50'>
              Shipping Information
            </h1>
            <p className='mt-2 text-gray-500 dark:text-gray-400'>
              Please enter your shipping details.
            </p>
          </div>
          <ShipmentDetailsForm />
        </div>
        <div className='min-h-full bg-background border-l py-4 px-4 sm:px-6 lg:px-8 rounded-b-md md:rounded-r-md md:rounded-bl-none'>
          <div className='h-full relative'>
            <PaymentForm />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ClientPage;
