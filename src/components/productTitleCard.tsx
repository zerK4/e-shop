import React from "react";

function ProductTitleCard({
  product,
  orientation = "vertical",
}: {
  product: Product;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div className='absolute bottom-0 -left-3 p-2 overflow-hidden duration-300 ease-in-out cursor-pointer'>
      <div className='p-2 rounded-r-3xl min-w-20 border border-zinc-800 flex group-hover:border-sky-500 items-center gap-2 backdrop-blur-sm bg-black/30 pl-4 max-h-14 ease-in-out duration-300'>
        <span className='-translate-x-[200%] w-0 opacity-0 group-hover:w-full group-hover:opacity-100 group-hover:translate-x-0 ease-in-out duration-300 whitespace-nowrap'>
          {product.title}
        </span>
        <div className='bg-sky-500/80 p-2 rounded-2xl overflow-hidden whitespace-nowrap w-full ease-in-out duration-300'>
          {product.price} {product.currency}
        </div>
      </div>
    </div>
  );
}

export default ProductTitleCard;
