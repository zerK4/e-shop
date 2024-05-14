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
  addToCart: ({
    product,
    qty,
    attributes,
  }: {
    product: Product;
    qty: number;
    attributes: { [key: string]: string }[];
  }) => void;
  removeItemFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  existsInCart: (id: string) => ProductInterface["cart"][0] | null;
}

export const useProductStore = create(
  persist<ProductInterface>(
    (set, get) => ({
      cart: [],
      addToCart: ({ product, qty, attributes }) => {
        set((state) => {
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
      existsInCart(id: string) {
        const item = get().cart.find((item) => {
          if (item.product.slug === id) {
            return item;
          }

          return false; // Early termination for efficiency
        });

        return item || null; // Return item or null if not found
      },
    }),
    {
      name: "cart",
    }
  )
);
