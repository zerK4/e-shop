"use client";

import { Minus, Plus, ShoppingCart, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
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
          className='relative h-12 w-12 bg-black'
        >
          <span
            className={cn(
              "absolute h-6 w-6 bg-transparent -top-3 -left-3 rounded-md flex items-center justify-center ease-in-out duration-300",
              cartContent?.length === 0 || !cartContent ? "" : " bg-red-500 "
            )}
          >
            {cartContent && cartContent?.length > 0 && cartContent?.length}
          </span>
          <ShoppingCart size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent
        showCloseButton={false}
        side={"right"}
        className='bg-black/70 backdrop-blur-sm drop-filter w-full sm:max-w-xl max-h-[100dvh] px-0'
      >
        <SheetHeader className='px-4'>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        {!cartContent || cartContent?.length === 0 ? (
          <div className='h-full flex items-center justify-center text-zinc-500'>
            Pretty empty here...
          </div>
        ) : (
          <div className='mb-32 max-h-[60vh] md:min-h-[80vh] overflow-y-auto flex flex-col px-4 py-4'>
            {cartContent && cartContent?.length !== 0
              ? cartContent?.map((item, i) => (
                  <div key={i} className='flex gap-2 border-b py-2'>
                    <div className='relative border rounded-md h-[70px] w-[70px]'>
                      <Button
                        onClick={() => removeItemFromCart(item.product.slug)}
                        className='absolute -top-3 -left-3 h-6 w-6 rounded-full z-20'
                        size={"icon"}
                        variant={"destructive"}
                      >
                        <XIcon size={12} />
                      </Button>
                      <div className='h-full w-full'>
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
                                <span className='mx-2 text-zinc-500'>/</span>
                              )}
                            </span>
                          ))}
                        </span>
                        <div className='flex items-center bg-neutral-900/50 backdrop-blur-sm h-10 rounded-full border'>
                          <Button
                            onClick={() =>
                              updateQty(item.product.slug, item.quantity - 1)
                            }
                            size={"icon"}
                            className='bg-transparent rounded-l-full'
                          >
                            <Minus size={12} />
                          </Button>
                          <span className='px-2'>{item.quantity}</span>
                          <Button
                            onClick={() =>
                              updateQty(item.product.slug, item.quantity + 1)
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
                ))
              : null}
          </div>
        )}
        <SheetFooter className='fixed bottom-2 right-0 w-full px-2 z-50 bg-black pt-2 border-t'>
          <div className='flex flex-col gap-4 w-full'>
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
            </div>
            <div className='flex items-center gap-2 h-10 w-full'>
              {cartContent?.length !== 0 && (
                <Button className='my-2 w-full'>Checkout</Button>
              )}
              <SheetClose asChild className=''>
                <Button
                  className={cn(
                    cartContent?.length === 0 ? "w-full" : "min-w-10"
                  )}
                  size={"icon"}
                  variant={"outline"}
                >
                  <XIcon size={16} />
                </Button>
              </SheetClose>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
