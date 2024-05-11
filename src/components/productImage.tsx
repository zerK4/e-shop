import Image from "next/image";
import React from "react";

function ProductImage({ product }: { product: Product }) {
  return (
    <div className='group flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-white  dark:bg-black relative aspect-square '>
      <Image
        src={product.images[0] ?? ""}
        alt={product.title}
        fill
        fetchPriority='high'
        decoding='async'
        className='relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105'
      />
    </div>
  );
}

export default ProductImage;
