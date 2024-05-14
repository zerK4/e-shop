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
import ProductImage from "./productImage";
import Link from "next/link";

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
        className='bg-black/70 backdrop-blur-sm drop-filter w-full sm:max-w-xl'
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
                            className='absolute -top-3 -left-3 h-6 w-6 rounded-full z-20'
                            size={"icon"}
                            variant={"destructive"}
                          >
                            <XIcon size={12} />
                          </Button>
                          <div className='h-[70px] w-[70px]'>
                            <ProductImage product={item.product} />
                          </div>
                        </div>
                        <div className='w-full'>
                          <div className='flex justify-between'>
                            <Link
                              href={`/products/${item.product.slug
                                .split("-")
                                .slice(0, -1)
                                .join("-")}?${item.product.slug
                                .split("-")
                                .slice(-1)}`}
                            >
                              {" "}
                              <h2 className='text-xl font-semibold'>
                                {item.product.title}
                              </h2>
                              {/* "http://localhost:3000/products/hold-ma-wine-beanie-color=blue&sizes=xl" */}
                            </Link>
                            <span className=''>
                              ${item.product.price * item.quantity}{" "}
                              {item.product.currency}
                            </span>
                          </div>
                          <div className='flex items-center justify-between w-full'>
                            <span className='flex items-center'>
                              {item.attributes.map((attr, i) => (
                                <span key={i}>
                                  {attr.value}
                                  {i < item.attributes.length - 1 && (
                                    <span className='mx-2 text-zinc-500'>
                                      /
                                    </span>
                                  )}
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
