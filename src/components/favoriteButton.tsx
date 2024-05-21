import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductInterface, useProductStore } from "@/store/product.store";
import { toast } from "sonner";

function FavoriteButton({
  display = false,
  product,
}: {
  display?: boolean;
  product: Product;
}) {
  const { toggleFavorite, favorites } = useProductStore();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(
      favorites && favorites.some((x) => x.slug === product.slug) ? true : false
    );
  }, [favorites, product]);

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        toggleFavorite(product);
      }}
      className={cn(
        "group/heart top-4 z-20",
        display
          ? "right-4"
          : "right-0 absolute group-hover:right-4 scale-0 group-hover:opacity-100 group-hover:scale-100 ease-in-out duration-300 opacity-0",
        isFavorite && "opacity-100 right-4 scale-1"
      )}
      size={"icon"}
      variant={"link"}
    >
      <Heart
        size={30}
        className={cn(
          "stroke-red-500 group-hover/heart:fill-red-500 ease-in-out duration-300",
          isFavorite && "fill-red-500"
        )}
      />
    </Button>
  );
}

export default FavoriteButton;
