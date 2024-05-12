"use client";

import { Minus, Plus, ShoppingCart, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ProductInterface, useProductStore } from "@/store/product.store";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const CartSheet = () => {
  const { cart, removeItemFromCart, updateQty } = useProductStore();
  const [cartContent, setCartContent] = useState<ProductInterface["cart"]>();
  const [total, setTotal] = useState<string>();
  const [taxes, setTaxes] = useState<string>();

  useEffect(() => {
    setCartContent(cart ?? []);

    const totalPrice = cart.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );

    const ttaxes = totalPrice * 0.15;
    const currentTotal = totalPrice + ttaxes;

    setTotal(currentTotal.toFixed(2));

    setTaxes(ttaxes.toFixed(2));
  }, [cart]);

  return (
    <Sheet>
      <SheetTrigger asChild className='flex'>
        <Button
          variant='outline'
          size={"icon"}
          className='relative h-8 w-8 bg-black'
        >
          <span
            className={cn(
              "absolute h-6 w-6 bg-transparent -top-3 -right-3 rounded-full flex items-center justify-center ease-in-out duration-300",
              cartContent?.length === 0 || !cartContent ? "" : " bg-red-500 "
            )}
          >
            {cartContent && cartContent?.length > 0 && cartContent?.length}
          </span>
          <ShoppingCart size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"right"}
        className='bg-black/70 backdrop-blur-sm w-full sm:max-w-[50vw]'
      >
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        {!cartContent || cartContent?.length === 0 ? (
          <div className='h-full flex items-center justify-center text-zinc-500'>
            Pretty empty here...
          </div>
        ) : (
          <div className='h-[95%] flex flex-col justify-between'>
            <div className='my-4 h-full max-h-[90%]'>
              {cartContent && cartContent?.length !== 0
                ? cartContent?.map((item, i) => (
                    <div key={i} className='flex flex-col justify-between'>
                      <div className='flex gap-2 border-b py-2'>
                        <div className='relative border rounded-md w-fit'>
                          <Button
                            onClick={() =>
                              removeItemFromCart(item.product.slug)
                            }
                            className='absolute -top-3 -left-3 h-6 w-6 rounded-full'
                            size={"icon"}
                            variant={"destructive"}
                          >
                            <XIcon size={12} />
                          </Button>
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.title}
                            height={70}
                            width={70}
                            className='object-cotain'
                          />
                        </div>
                        <div className='w-full'>
                          <div className='flex justify-between'>
                            <h2 className='text-xl font-semibold'>
                              {item.product.title}
                            </h2>
                            <span className=''>
                              ${item.product.price * item.quantity}{" "}
                              {item.product.currency}
                            </span>
                          </div>
                          <div className='flex items-center justify-between w-full'>
                            <span className='flex items-center gap-2'>
                              {item.attributes.map((attr, i) => (
                                <span
                                  key={i}
                                  className='px-4 py-1 rounded-3xl border border-primary'
                                >
                                  {attr.value}
                                </span>
                              ))}
                            </span>
                            <div className='flex items-center bg-neutral-900/50 backdrop-blur-sm h-10 rounded-full border'>
                              <Button
                                onClick={() =>
                                  updateQty(
                                    item.product.slug,
                                    item.quantity - 1
                                  )
                                }
                                size={"icon"}
                                className='bg-transparent rounded-l-full'
                              >
                                <Minus size={12} />
                              </Button>
                              <span className='px-2'>{item.quantity}</span>
                              <Button
                                onClick={() =>
                                  updateQty(
                                    item.product.slug,
                                    item.quantity + 1
                                  )
                                }
                                size={"icon"}
                                className='bg-transparent rounded-r-full'
                              >
                                <Plus size={12} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : null}
            </div>
            <div className='flex flex-col gap-1'>
              <span className='flex justify-between border-b'>
                Taxes: <span>${taxes}</span>
              </span>
              <span className='flex justify-between border-b'>
                Shipping: <span>Calculated at checkout</span>
              </span>
              <span className='flex justify-between border-b text-xl font-bold'>
                Total: <span>${total}</span>
              </span>
              <Button className='my-2'>Checkout</Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
