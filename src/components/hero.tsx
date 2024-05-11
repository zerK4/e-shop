"use client";

import Image from "next/image";
import { Card } from "./ui/card";
import Link from "next/link";
import ProductTitleCard from "./productTitleCard";

export const Hero = ({ products }: { products: Product[] }) => {
  return (
    <div className='grid grid-cols-3 h-[90vh] gap-4'>
      {products.map((product, i) => (
        <Card
          key={i}
          className='relative group overflow-hidden col-span-3 min-w-[33%] md:col-span-1 first:col-span-3 md:first:row-span-2 md:first:col-span-2 h-[30vh] md:h-auto hover:border-sky-500  ease-in-out duration-300'
        >
          <Link
            href={`/product/${product.title
              .split(" ")
              .join("-")
              .split("'")
              .join("")
              .toLowerCase()}`}
            className='relative block h-full w-full'
          >
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
