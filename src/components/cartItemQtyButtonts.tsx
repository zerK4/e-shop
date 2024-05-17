import React from "react";
import { Button } from "./ui/button";
import { ProductInterface, useProductStore } from "@/store/product.store";
import { Minus, Plus } from "lucide-react";

function CartItemQtyButtons({
  item,
}: {
  item: ProductInterface["cartProducts"][0];
}) {
  const { updateQty } = useProductStore();
  return (
    <div className='flex items-center bg-neutral-900/50 backdrop-blur-sm h-10 rounded-full border'>
      <Button
        onClick={() => updateQty(item.product.slug, item.quantity - 1)}
        size={"icon"}
        className='bg-transparent rounded-l-full'
      >
        <Minus size={12} />
      </Button>
      <span className='px-2'>{item.quantity}</span>
      <Button
        onClick={() => updateQty(item.product.slug, item.quantity + 1)}
        size={"icon"}
        className='bg-transparent rounded-r-full'
      >
        <Plus size={12} />
      </Button>
    </div>
  );
}

export default CartItemQtyButtons;
