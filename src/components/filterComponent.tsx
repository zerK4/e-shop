"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { ChevronRight, Filter } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";

function FilterComponent({
  categories,
  brands,
  showCommonFilters = false,
}: {
  categories: never[] | Set<any>;
  brands: never[] | Set<any>;
  showMobileFilter?: boolean;
  showCommonFilters?: boolean;
}) {
  const [currentFilters, setCurrentFilters] = useState<string[]>([
    "all",
    ...categories,
  ]);
  const [currentBrands, setCurrentBrands] = useState<string[]>([...brands]);

  return (
    <>
      {showCommonFilters && (
        <div className='lg:flex flex-col gap-1 min-w-[15rem] bg-black border border-zinc-900 rounded-md mb-4 hidden'>
          <CommonFilters
            currentFilters={currentFilters}
            currentBrands={currentBrands}
          />
        </div>
      )}
      <div className='fixed right-0 my-auto top-[45vh] flex flex-col items-center justify-center z-50 px-2'>
        <MobileFiltering
          currentFilters={currentFilters}
          currentBrands={currentBrands}
        />
      </div>
    </>
  );
}

export default FilterComponent;

const MobileFiltering = ({
  currentFilters,
  currentBrands,
}: {
  currentFilters: string[];
  currentBrands: string[];
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className='min-w-10 flex lg:hidden h-12 w-12 bg-zinc-300/20 drop-filter backdrop-blur-sm border-none'
          size={"icon"}
          variant={"outline"}
        >
          <Filter size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent side={"bottom"} className='bg-black/50 backdrop-blur-sm'>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div>
          <CommonFilters
            currentFilters={currentFilters}
            currentBrands={currentBrands}
          />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const CommonFilters = ({
  currentFilters,
  currentBrands,
}: {
  currentFilters: string[];
  currentBrands: string[];
}) => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const updateSearchParams = ({
    key,
    value,
  }: {
    key: string;
    value: string;
  }) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key.toLowerCase(), value.toLowerCase());
    } else {
      params.delete(key);
    }
    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <>
      <div className='my-4 border-b border-zinc-900 px-2 text-lg'>
        Categories
      </div>
      <div className='px-2'>
        {currentFilters.map((category, i) => (
          <div
            className={cn(
              "cursor-pointer w-fit text-zinc-500 hover:text-white flex items-center gap-2",
              searchParams.get("category") === category ? "text-white" : ""
            )}
            onClick={() =>
              updateSearchParams({ key: "category", value: category })
            }
            key={i}
          >
            {searchParams.get("category") === category ? (
              <span>
                <ChevronRight size={12} />
              </span>
            ) : null}
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
        ))}
      </div>
      <div className='my-4 border-b border-zinc-900 px-2 text-lg'>Brand</div>
      <div className='px-2'>
        {currentBrands.map((brand, i) => (
          <div
            className={cn(
              "cursor-pointer w-fit text-zinc-500 hover:text-white flex items-center gap-2",
              searchParams.get("brand") === brand.toLowerCase()
                ? "text-white"
                : ""
            )}
            onClick={() => updateSearchParams({ key: "brand", value: brand })}
            key={i}
          >
            {searchParams.get("brand") === brand.toLowerCase() ? (
              <span>
                <ChevronRight size={12} />
              </span>
            ) : null}
            {brand.charAt(0).toUpperCase() + brand.slice(1)}
          </div>
        ))}
      </div>
    </>
  );
};
