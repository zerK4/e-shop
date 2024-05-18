"use client";

import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { toast } from "sonner";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = searchParams.get("payment_intent_client_secret");

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        return;
      }
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, searchParams]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      toast.error(error.message as string);
    } else {
      toast.error(error.message as string);
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form
      className='flex flex-col justify-between gap-4 w-full h-full'
      id='payment-form'
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col gap-4'>
        <h2 className='text-xl font-bold h-fit'>Payment Information</h2>
        <PaymentElement
          id='payment-element'
          options={paymentElementOptions as StripePaymentElementOptions}
          className='!text-white'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <Button disabled={isLoading || !stripe || !elements} id='submit'>
          <span id='button-text'>
            {isLoading ? (
              <div className='spinner' id='spinner'></div>
            ) : (
              "Pay now"
            )}
          </span>
        </Button>
      </div>
    </form>
  );
}
