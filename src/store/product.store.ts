import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ProductInterface {
  cartProducts: {
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
  existsInCart: (id: string) => ProductInterface["cartProducts"][0] | null;
}

export const useProductStore = create(
  persist<ProductInterface>(
    (set, get) => ({
      cartProducts: [],
      addToCart: ({ product, qty, attributes }) => {
        set((state) => {
          toast.success("Product added successfully");
          return {
            cartProducts: [
              ...state.cartProducts,
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
        const updatedCart = get().cartProducts.filter(
          (item) => item.product.slug !== id
        );
        set({ cartProducts: updatedCart });
        toast.success("Product removed successfully");
      },
      updateQty(id, qty) {
        if (qty <= 0) {
          get().removeItemFromCart(id);
          toast.success("Product removed successfully");
          return;
        }

        const updatedCart = get().cartProducts.map((item) => {
          if (item.product.slug === id) {
            return {
              ...item,
              quantity: qty,
            };
          }
          return item;
        });
        toast.success("Quantity updated successfully");
        set({ cartProducts: updatedCart });
      },
      existsInCart(id: string) {
        const item = get().cartProducts.find((item) => {
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
