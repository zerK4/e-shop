"use client";

import ProductImage from "@/components/productImage";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

function ClientPage({ products }: { products: Product[] }) {
  return (
    <div className='flex flex-wrap gap-2 pb-4 min-h-auto'>
      {products.map((product, i) => (
        <Link
          href={`/products/${product.slug}`}
          key={i}
          className='h-80 flex-grow flex-basis-[200px]'
        >
          <div
            key={i}
            className='group h-full w-full border rounded-md border-zinc-900 hover:border-primary relative overflow-hidden'
          >
            <Button
              className='group/heart absolute top-2 right-0 group-hover:right-2 z-10 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 ease-in-out duration-300'
              size={"icon"}
              variant={"link"}
            >
              <Heart
                size={24}
                className='stroke-red-500 group-hover/heart:fill-red-500 ease-in-out duration-300'
              />
            </Button>
            <ProductImage product={product} key={i} />
            <div className='absolute bottom-2 left-2 rounded-sm bg-black/10 border border-neutral-900 backdrop-blur-sm flex items-center gap-2'>
              <span className='bg-primary p-2 rounded-l-md'>
                ${product.price} {product.currency}
              </span>
              <span className='p-2'>{product.title}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ClientPage;
