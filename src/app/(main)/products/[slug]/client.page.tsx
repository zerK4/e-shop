"use client";

import { ProductImageComponent } from "@/components/productImageComponent";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ProductInterface, useProductStore } from "@/store/product.store";
import { ArrowUp, Heart, Plus, Star, Trash } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function ClientPage({ product }: { product: Product }) {
  const [canAdd, setCanAdd] = useState<boolean>(false);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [cartItem, setCartItem] = useState<ProductInterface["cart"][0] | null>(
    null
  );

  const { addToCart, existsInCart, cart, updateQty, removeItemFromCart } =
    useProductStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setCanAdd(true);

    setIsInCart(!!existsInCart(`${product.slug}-${searchParams.toString()}`));

    product.attributes.some((attr) => {
      const exists = searchParams.get(attr.name.toLowerCase());
      if (!exists) setCanAdd(false);
    });

    if (existsInCart(`${product.slug}-${searchParams.toString()}`)) {
      setIsInCart(true);
      setCartItem(existsInCart(`${product.slug}-${searchParams.toString()}`));
    }
  }, [searchParams, product, existsInCart, cart]);

  const updateSearchParams = ({
    key,
    value,
  }: {
    key: string;
    value: string;
  }) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key.toLowerCase(), value.toLowerCase());
    } else {
      params.delete(key);
    }

    setIsInCart(!!existsInCart(`${product.slug}-${searchParams.toString()}`));

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleAddToCart = () => {
    if (canAdd && !isInCart) {
      addToCart({
        product: {
          ...product,
          slug: `${product.slug}-${searchParams.toString()}`,
        },
        attributes: [
          ...searchParams
            .toString()
            .split("&")
            .map((param) => {
              const [key, value] = param.split("=");
              return { key, value };
            }),
        ],
        qty: 1,
      });
      setIsInCart(true);
    } else if (!canAdd) {
      toast.warning("Please select product attributes.");
    }

    if (isInCart && cartItem) {
      updateQty(
        `${product.slug}-${searchParams.toString()}`,
        cartItem.quantity + 1
      );
    }
  };

  return (
    <div className='min-h-screen lg:min-h-full  justify-center items-center px-6 flex gap-10 flex-col lg:flex-row m-2 border rounded-md bg-black'>
      <ProductImageComponent product={product} />
      <div className='w-full'>
        <div className='border-b pb-4'>
          <h1 className='text-[4rem] font-bold leading-[3.5rem] flex items-center justify-between'>
            {product.title}
            <Button className='' variant={"link"} size={"icon"}>
              <Heart
                size={30}
                className='stroke-red-500 cursor-pointer hover:fill-red-500 ease-in-out duration-300'
              />
            </Button>
          </h1>
          <div className='mt-4 flex items-center justify-between w-full'>
            <span className='bg-primary w-fit p-2 rounded-3xl px-4'>
              ${product.price} {product.currency}
            </span>
            <div className='flex items-center gap-2'>
              <span className='flex items-center gap-2'>
                <Star size={14} className='fill-yellow-400 stroke-yellow-500' />
                {product.rating}
              </span>
              /<span>{product.reviews.length} reviews</span>
            </div>
          </div>
        </div>
        <div className='my-2 flex flex-col gap-4'>
          {product.attributes.map((attribute, i) => (
            <div key={i}>
              <h3 className='text-xl font-semibold uppercase'>
                {attribute.name}
              </h3>
              <div className='flex gap-2 items-center my-2'>
                {attribute.options.map((option, i) => (
                  <div
                    onClick={() =>
                      updateSearchParams({ key: attribute.name, value: option })
                    }
                    className={cn(
                      "border rounded-3xl !px-4 p-1 hover:border-primary ease-in-out duration-300 cursor-pointer",
                      searchParams
                        .get(attribute.name.toLowerCase())
                        ?.toLowerCase() === option.toLowerCase()
                        ? "border-primary"
                        : ""
                    )}
                    key={i}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Separator className='my-2 mb-4' />
        <div className=''>
          <span>{product.description}</span>
        </div>
        <Separator className='my-4' />
        <div className='my-4 w-full flex justify-between items-center'>
          <Button
            onClick={handleAddToCart}
            className={cn(
              " rounded-3xl p-6 relative",
              isInCart ? "w-fit pl-9" : "w-full"
            )}
          >
            {isInCart ? "Increase quantity" : "Add to cart"}
            <span className='absolute left-0 top-0 flex items-center h-full w-10 justify-center'>
              {isInCart ? <ArrowUp size={16} /> : <Plus size={16} />}
            </span>
          </Button>
          {isInCart && cartItem && (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => removeItemFromCart(cartItem.product.slug)}
                  className=''
                  size={"icon"}
                  variant={"destructive"}
                >
                  <Trash className='' size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove from cart</TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientPage;
