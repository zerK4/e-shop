"use client";

import { ShoppingCart, XIcon } from "lucide-react";
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
import CartItemAttribtues from "./cartItemAttributes";
import CartItemRemoveButton from "./cartItemRemoveButton";
import CartItemTotalPrice from "./cartItemTotalPrice";

export const CartSheet = () => {
  const { cartProducts, removeItemFromCart, updateQty } = useProductStore();
  const [cartContent, setCartContent] =
    useState<ProductInterface["cartProducts"]>();

  useEffect(() => {
    setCartContent(cartProducts ?? []);
  }, [cartProducts]);

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
        // showCloseButton={false}
        side={"right"}
        className='bg-black/70 backdrop-blur-sm drop-filter w-full h-screen sm:max-w-xl px-0 pb-[12rem]'
      >
        <SheetHeader className='px-4'>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        {!cartContent || cartContent?.length === 0 ? (
          <div className='h-full flex items-center justify-center text-zinc-500'>
            Pretty empty here...
          </div>
        ) : (
          <div className='mb-32 overflow-y-auto flex flex-col px-4 py-4 w-full h-full'>
            {cartContent && cartContent?.length !== 0
              ? cartContent?.map((item, i) => (
                  <div key={i} className='flex gap-2 border-b py-2'>
                    <div className='relative border rounded-md h-[70px] w-[70px]'>
                      <CartItemRemoveButton item={item} />
                      <div className='h-full w-full'>
                        <ProductImage product={item.product} />
                      </div>
                    </div>
                    <CartItemAttribtues item={item} />
                  </div>
                ))
              : null}
          </div>
        )}
        <SheetFooter className='sticky bottom-2 w-full px-2 z-50 bg-black pt-2 border-t'>
          <div className='flex flex-col gap-4 w-full'>
            <CartItemTotalPrice />
            <div className='flex items-center gap-2 h-10 w-full'>
              {cartContent?.length !== 0 && (
                <SheetClose asChild>
                  <Link href='/checkout' className='w-full'>
                    <Button className='my-2 w-full'>Checkout</Button>
                  </Link>
                </SheetClose>
              )}
              <SheetClose asChild className='flex md:hidden'>
                <Button
                  className={cn(
                    cartContent?.length === 0 ? "w-full" : "min-w-10",
                    "h-10"
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
