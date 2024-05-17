import { ProductInterface } from "@/store/product.store";
import Link from "next/link";
import React from "react";
import CartItemQtyButtons from "./cartItemQtyButtonts";
import CartItemPrice from "./cartItemPrice";

function CartItemAttribtues({
  item,
  showQtyButtons = true,
  showPrice = true,
}: {
  item: ProductInterface["cartProducts"][0];
  showQtyButtons?: boolean;
  showPrice?: boolean;
}) {
  return (
    <div className='w-full'>
      <div className='flex justify-between items-center w-full'>
        <Link
          href={`/products/${item.product.slug
            .split("-")
            .slice(0, -1)
            .join("-")}?${item.product.slug.split("-").slice(-1)}`}
        >
          <h2 className='text-xl font-semibold'>{item.product.title}</h2>
        </Link>
        {showPrice && <CartItemPrice item={item} />}
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
        {showQtyButtons && <CartItemQtyButtons item={item} />}
      </div>
    </div>
  );
}

export default CartItemAttribtues;
