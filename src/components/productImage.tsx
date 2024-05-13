"use client";

import Image from "next/image";
import React, { useState } from "react";

function ProductImage({ product }: { product: Product }) {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  return (
    <div
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className='group flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-white  dark:bg-black relative aspect-square '
    >
      <Image
        src={
          isHovering
            ? product.images[1] ?? product.images[0]
            : product.images[0]
        }
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
