"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Heart, Plus, XIcon } from "lucide-react";
import { useProductStore } from "@/store/product.store";
import { cn } from "@/lib/utils";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import ProductImage from "./productImage";

function FavoritesDropdown() {
  const { favorites, toggleFavorite, addToCart } = useProductStore();

  if (!favorites || favorites.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"} size={"icon"} className='p-0 relative'>
          <span
            className={cn(
              "absolute h-6 w-6 bg-transparent -top-3.5 -left-2 rounded-md flex items-center justify-center ease-in-out duration-300 text-white",
              favorites?.length === 0 || !favorites ? "" : " bg-red-500 "
            )}
          >
            {favorites && favorites.length !== 0 && favorites?.length}
          </span>
          <Heart
            size={26}
            className={cn(
              "stroke-red-500",
              favorites?.length === 0 || !favorites ? "" : " fill-red-500"
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='p-2 max-h-[80vh] md:max-h-[50vh] overflow-y-auto scrollbar-none'
      >
        {favorites?.map((item, i) => (
          <Link href={`/products/${item.slug}`} key={i} className=''>
            <DropdownMenuItem className='hover:bg-muted p-2 rounded-md '>
              <div className='flex items-center justify-between gap-4 '>
                <div className='flex items-center gap-2 '>
                  <Button className='h-20 w-6 p-0' variant={"default"}>
                    <Plus size={16} />
                  </Button>
                  <div className='h-20 w-20 border rounded-md'>
                    <ProductImage product={item} />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <span className='text-foreground'>{item.title}</span>
                    <span>
                      {item.price} {item.currency}
                    </span>
                  </div>
                </div>
                <Button
                  size={"icon"}
                  variant={"destructive"}
                  className='h-8 w-8'
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(item);
                  }}
                >
                  <XIcon size={12} />
                </Button>
              </div>
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FavoritesDropdown;
