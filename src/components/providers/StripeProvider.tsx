"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

function StripeProvider({
  options,
  children,
}: {
  children: React.ReactNode;
  options: any;
}) {
  return (
    <Elements options={options as any} stripe={stripePromise}>
      {children}
    </Elements>
  );
}

export default StripeProvider;
