import React from "react";
import { Button } from "./ui/button";
import { ProductInterface, useProductStore } from "@/store/product.store";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function CartItemRemoveButton({
  item,
  className = "absolute -top-3 -left-3 h-6 w-6 rounded-full z-20",
}: {
  item: ProductInterface["cartProducts"][0];
  className?: string;
}) {
  const { removeItemFromCart } = useProductStore();
  return (
    <Button
      onClick={() => removeItemFromCart(item.product.slug)}
      className={cn(className)}
      size={"icon"}
      variant={"destructive"}
    >
      <XIcon size={12} />
    </Button>
  );
}

export default CartItemRemoveButton;
