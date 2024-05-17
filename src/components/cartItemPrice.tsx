import { ProductInterface } from "@/store/product.store";
import React from "react";

function CartItemPrice({
  item,
}: {
  item: ProductInterface["cartProducts"][0];
}) {
  return (
    <div>
      ${item.product.price * item.quantity} {item.product.currency}
    </div>
  );
}

export default CartItemPrice;
