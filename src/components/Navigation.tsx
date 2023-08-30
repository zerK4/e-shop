"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { useProductStore } from "@/store/product.store";

export function Navigation({ categories: cats }: { categories: string }) {
  const { setCategories, categories } = useProductStore();

  React.useEffect(() => {
    setCategories(JSON.parse(cats));
  }, [cats]);
  return (
    <NavigationMenu className="md:flex hidden z-50 ">
      <NavigationMenuList className="">
        {categories.map((component) => (
          <Link key={component.name} href={`/categories/${component.link}`}>
            <NavigationMenuItem className="relative">
              <NavigationMenuTrigger className="">
                {component.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent
                asChild
                className="absolute bg-primary border shadow rounded-md top-14 overflow-hidden min-w-[200px]"
              >
                <div className="p-4">
                  <div className="w-full h-60 relative">
                    <Image
                      src={component.image || "/next.svg"}
                      alt={component.name}
                      fill
                      className="object-contain rounded-md"
                    />
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </Link>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
