"use client";

import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { usePaymentStore } from "@/store/paymentStore";
import { useProductStore } from "@/store/product.store";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { shipmentData } = usePaymentStore();
  const { totalPrice } = useProductStore();

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

    const data = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (data.error) {
      if (
        data.error?.type === "card_error" ||
        data.error?.type === "validation_error"
      ) {
        toast.error(data.error.message as string);
      } else {
        toast.error(data.error?.message as string);
      }
    }

    if (!data.error) {
      toast.success(data.paymentIntent.status as string);
      console.log(shipmentData, data, "the data");
      useProductStore.setState({
        cartProducts: [],
      });
      router.push(`/confirmation?payment=${data.paymentIntent.id}`);
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form
      className='flex flex-col justify-between gap-4 h-full w-full'
      id='payment-form'
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col gap-4'>
        <h2 className='text-xl font-bold h-fit'>Payment Information</h2>
        <p className='text-red-500'>
          Do not try this, it works and you will be taxed with 2RON
        </p>
        <PaymentElement
          id='payment-element'
          options={paymentElementOptions as StripePaymentElementOptions}
          className='!text-white'
        />
      </div>
      <div className='flex flex-col gap-1'>
        {shipmentData && (
          <Button disabled={isLoading || !stripe || !elements} id='submit'>
            <span id='button-text'>
              {isLoading ? (
                <Loader size={16} className='animate-spin' />
              ) : (
                <span>Pay {totalPrice} USD</span>
              )}
            </span>
          </Button>
        )}
      </div>
    </form>
  );
}
