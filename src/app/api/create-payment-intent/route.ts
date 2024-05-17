import { ProductInterface } from "@/store/product.store";
import { NextResponse } from "next/server";

// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items: ProductInterface["cartProducts"]) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 10000;
};

export async function POST(req: Request) {
  try {
    const { items = [] } = await req.json();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "eur",
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log(paymentIntent, "this is the intent");

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.log(err);
  }
}
