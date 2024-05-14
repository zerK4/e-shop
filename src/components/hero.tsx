"use client";

import Image from "next/image";
import { Card } from "./ui/card";
import Link from "next/link";
import ProductTitleCard from "./productTitleCard";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";

export const Hero = ({ products }: { products: Product[] }) => {
  return (
    <div className='grid grid-cols-3 gap-4 items-start'>
      {products.map((product, i) => (
        <Card
          key={i}
          className='relative group overflow-hidden col-span-3 min-w-[33%] md:col-span-1 first:col-span-3 md:first:row-span-2 md:first:col-span-2 h-[30vh] md:h-auto hover:border-sky-500  ease-in-out duration-300'
        >
          <Link
            href={`/products/${product.slug}`}
            className='relative block h-full w-full'
          >
            <Button
              className='group/heart absolute top-4 right-0 group-hover:right-4 z-10 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 ease-in-out duration-300'
              size={"icon"}
              variant={"link"}
            >
              <Heart
                size={30}
                className='stroke-red-500 group-hover/heart:fill-red-500 ease-in-out duration-300'
              />
            </Button>
            <div className='group flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-white  dark:bg-black relative aspect-square '>
              <Image
                src={product.images[1] ?? ""}
                alt={product.title}
                fill
                fetchPriority='high'
                decoding='async'
                className='relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105'
              />
            </div>
          </Link>
          <ProductTitleCard product={product} />
        </Card>
      ))}
    </div>
  );
};
