import { useProductStore } from "@/store/product.store";
import React, { useEffect, useState } from "react";

function CartItemTotalPrice() {
  const { cartProducts } = useProductStore();
  const [total, setTotal] = useState<string>();
  const [taxes, setTaxes] = useState<string>();

  useEffect(() => {
    const totalPrice = cartProducts.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );

    const ttaxes = totalPrice * 0.15;
    const currentTotal = totalPrice + ttaxes;

    setTotal(currentTotal.toFixed(2));

    setTaxes(ttaxes.toFixed(2));
  }, [cartProducts]);

  return (
    <div className='flex flex-col'>
      <span className='flex justify-between border-b py-1'>
        Taxes: <span>${taxes}</span>
      </span>
      <span className='flex justify-between border-b py-1'>
        Shipping: <span>Calculated at checkout</span>
      </span>
      <span className='flex justify-between border-b text-xl font-bold py-1'>
        Total: <span>${total}</span>
      </span>
    </div>
  );
}

export default CartItemTotalPrice;
