"use client";

import { toast } from "sonner";
import { Button } from "./ui/button";
import { Info, InfoIcon, XIcon } from "lucide-react";
import { useProductStore } from "@/store/product.store";

export const removeFavoriteAfterAddingInCart = (t: any, product: Product) => {
  return (
    <div className='bg-zinc-100 text-black rounded-md p-4 w-[22rem] backdrop-blur-sm'>
      <div className='flex items-center gap-2'>
        <InfoIcon size={24} className='fill-black stroke-white' />
        <span className='text-sm font-medium'>
          Do you want to remove the product from favorites now?
        </span>
      </div>
      <div className='flex items-center gap-2 w-full justify-end'>
        <Button
          className=''
          variant={"destructive"}
          onClick={() => {
            useProductStore.getState().toggleFavorite(product);
            toast.dismiss(t);
          }}
        >
          Remove
        </Button>
        <Button className='' size={"icon"} onClick={() => toast.dismiss(t)}>
          <XIcon size={16} />
        </Button>
      </div>
    </div>
  );
};
