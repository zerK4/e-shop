"use client";

import { useProductStore } from "@/store/product.store";
import React from "react";
import { Card } from "@/components/ui/card";
import ProductImage from "@/components/productImage";
import { Button } from "@/components/ui/button";
import { ChevronRight, X } from "lucide-react";
import CartItemQtyButtons from "@/components/cartItemQtyButtonts";
import CartItemAttribtues from "@/components/cartItemAttributes";
import CartItemPrice from "@/components/cartItemPrice";
import CartItemRemoveButton from "@/components/cartItemRemoveButton";
import CartItemTotalPrice from "@/components/cartItemTotalPrice";
import { switchPage } from "@/lib/utils";
import { useRouter } from "next/navigation";

function ClientPage() {
  const { cartProducts } = useProductStore();
  const router = useRouter();

  return (
    <Card
      id='cart-page'
      className='flex flex-col-reverse md:flex-row gap-2 p-2 bg-neutral-950/50'
    >
      <div className='w-full flex flex-col gap-2'>
        {cartProducts.map(({ product, attributes, quantity }, i) => (
          <div
            key={i}
            className='flex items-center gap-2 hover:bg-muted rounded-md p-2'
          >
            <div className='h-20'>
              <CartItemRemoveButton
                className='w-6 h-full p-0'
                item={{ product, attributes, quantity }}
              />
            </div>
            <div className='flex items-center justify-between w-full'>
              <div className='flex items-center gap-2 w-full pr-4'>
                <div className='w-20 h-20'>
                  <ProductImage product={product} />
                </div>
                <CartItemAttribtues
                  item={{ product, attributes, quantity }}
                  showQtyButtons={false}
                  showPrice={false}
                />
              </div>
              <div className='flex flex-col items-end gap-1'>
                <CartItemPrice item={{ product, attributes, quantity }} />
                <CartItemQtyButtons item={{ product, attributes, quantity }} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Card className='w-full md:w-[30rem] flex flex-col justify-between sticky top-2 h-fit p-2'>
        <CartItemTotalPrice />
        <Button
          onClick={() =>
            switchPage({
              href: "/shipment",
              router: router,
              fromId: "cart-page",
            })
          }
          className='flex items-center gap-2 w-full'
        >
          Shipment <ChevronRight size={16} />
        </Button>
      </Card>
    </Card>
  );
}

export default ClientPage;
