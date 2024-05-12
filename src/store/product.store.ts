import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProductInterface {
  cart: {
    product: Product;
    quantity: number;
    attributes: {
      [key: string]: string;
    }[];
  }[];
  updateCart: ({
    product,
    qty,
    attributes,
  }: {
    product: Product;
    qty: number;
    attributes: {
      [key: string]: string;
    }[];
  }) => void;
  removeItemFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  existsInCart: (id: string) => boolean;
}

export const useProductStore = create(
  persist<ProductInterface>(
    (set, get) => ({
      cart: [],
      updateCart: ({ product, qty, attributes }) => {
        set((state) => {
          const exists = state.cart.find(
            (x) => x.product.slug === product.slug
          );

          if (exists) {
            toast.success("Quantity updated successfully");
            return {
              cart: [
                ...state.cart.map((item) => {
                  return item.product.slug === exists.product.slug
                    ? { ...item, quantity: item.quantity + qty }
                    : item;
                }),
              ],
            };
          }

          toast.success("Product added successfully");
          return {
            cart: [
              ...state.cart,
              {
                product,
                quantity: qty,
                attributes,
              },
            ],
          };
        });
      },
      removeItemFromCart: (id) => {
        const updatedCart = get().cart.filter(
          (item) => item.product.slug !== id
        );
        set({ cart: updatedCart });
        toast.success("Product removed successfully");
      },
      updateQty(id, qty) {
        if (qty <= 0) {
          get().removeItemFromCart(id);
          toast.success("Product removed successfully");
          return;
        }

        const updatedCart = get().cart.map((item) => {
          if (item.product.slug === id) {
            return {
              ...item,
              quantity: qty,
            };
          }
          return item;
        });
        toast.success("Quantity updated successfully");
        set({ cart: updatedCart });
      },
      existsInCart(id) {
        return get().cart.some((item) => item.product.slug === id);
      },
    }),
    {
      name: "cart",
    }
  )
);
