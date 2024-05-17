import React, { Suspense } from "react";
import ClientPage from "./client.page";
import axios from "axios";
import StripeProvider from "@/components/providers/StripeProvider";

async function page() {
  try {
    const { data } = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/create-payment-intent`,
      data: {
        items: [
          {
            name: "Product 1",
            price: 1000,
            quantity: 1,
          },
          {
            name: "Product 2",
            price: 2000,
            quantity: 2,
          },
        ],
      },
    });

    const appearance = {
      theme: "night",
      variables: {
        colorBackground: "#0a0a0a",
      },
      rules: {
        ".p-Input--focused": {
          border: "1px solid red",
        },
      },
    };
    const options = {
      clientSecret: data.clientSecret,
      appearance,
    };

    return (
      <div className='p-2 overflow-hidden'>
        {data.clientSecret && (
          <StripeProvider options={options as any}>
            <Suspense>
              <ClientPage paymentIntent={data.clientSecret} />
            </Suspense>
          </StripeProvider>
        )}
      </div>
    );
  } catch (error) {
    console.log(error);
  }
}
export default page;
