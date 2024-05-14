"use client";

import Link from "next/link";
import ProductImage from "./productImage";
import ProductTitleCard from "./productTitleCard";

export const ProductsBanner = ({ products }: { products: Product[] }) => {
  return (
    <div className='h-[30vh] flex overflow-hidden gap-4 scrollbar-none my-4'>
      {products.map((product, i) => (
        <div
          key={i}
          className='relative min-w-[20rem] h-full border overflow-hidden rounded-md group animate-infinite-scroll'
        >
          <ProductImage product={product} key={i} />
          <Link
            href={`/products/${product.title
              .split(" ")
              .join("-")
              .split("'")
              .join("")
              .toLowerCase()}`}
          >
            <ProductTitleCard product={product} />
          </Link>
        </div>
      ))}
    </div>
  );
};
