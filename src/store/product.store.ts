import { removeFavoriteAfterAddingInCart } from "@/components/notifications";
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
  totalPrice: string | null;
  favorites: Product[] | null;
  addToCart: ({
    product,
    qty,
    attributes,
  }: {
    product: Product & {
      initialSlug: string;
    };
    qty: number;
    attributes: { [key: string]: string }[];
  }) => void;
  removeItemFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  existsInCart: (id: string) => ProductInterface["cartProducts"][0] | null;
  toggleFavorite: (id: Product) => void;
}

export const useProductStore = create(
  persist<ProductInterface>(
    (set, get) => ({
      cartProducts: [],
      totalPrice: null,
      favorites: null,
      addToCart: ({ product, qty, attributes }) => {
        set((state) => {
          toast.success("Product added successfully");

          const existsInFavorites = get().favorites?.find(
            (x) => x.slug === product.initialSlug
          );

          if (existsInFavorites) {
            toast.custom(
              (t) => removeFavoriteAfterAddingInCart(t, existsInFavorites),
              {
                invert: true,
              }
            );
          }

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
      toggleFavorite: (slug) => {
        set((state) => {
          const exists = state.favorites?.includes(slug);
          if (exists) {
            toast.info("Product removed from favorites");
            return {
              favorites: state.favorites?.filter((item) => item !== slug),
            };
          }

          toast.info("Product added to favorites");
          return {
            favorites: [...(state.favorites || []), slug],
          };
        });
      },
    }),
    {
      name: "cart",
    }
  )
);
