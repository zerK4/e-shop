"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  Search,
  Youtube,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { CartSheet } from "./cartSheet";
import Image from "next/image";
import FilterComponent from "./filterComponent";
import { usePathname } from "next/navigation";

function Header({
  categories,
  brands,
}: {
  categories: never[] | Set<any>;
  brands: never[] | Set<any>;
}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
    ...categories,
  ]);

  const pathname = usePathname();

  console.log(pathname.split("/")[1]);

  return (
    <header className='flex items-center justify-between h-20 px-4 fixed bottom-0 left-0 md:relative z-50 w-full bg-black/30 md:bg-transparent border-t md:border-none drop-filter'>
      <Link href={"/"}>
        <div className='w-fit mr-4 hidden md:flex items-center gap-2'>
          <Image src={"/logo.png"} height={30} width={30} alt={"Aheader"} />
        </div>
      </Link>
      <MobileNav selectedCategories={selectedCategories} />
      <nav className='md:flex flex-1 gap-2 hidden'>
        {selectedCategories.map((category, i) => (
          <Link
            key={i}
            className='text-zinc-500 hover:text-foreground ease-out duration-300 w-fit'
            href={`/products?category=${category.toLowerCase()}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        ))}
      </nav>
      <div className='w-fit mr-4 flex md:hidden flex-1 justify-center'>
        <Link href={"/"}>
          <Image src={"/logo.png"} height={30} width={30} alt={"Aheader"} />
        </Link>
      </div>
      <div className='md:flex flex-1 hidden gap-2 border-muted border rounded-md p-2'>
        <Input className='border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 h-6' />
        <Button className='h-6 min-w-6' size={"icon"} variant={"link"}>
          <Search size={16} />
        </Button>
      </div>
      <div className='flex md:flex-1 justify-end items-center gap-2'>
        <Button className='hidden md:flex' variant={"link"}>
          Login/Register
        </Button>
        <CartSheet />
      </div>
    </header>
  );
}

export default Header;

const MobileNav = ({
  selectedCategories,
}: {
  selectedCategories: string[];
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild className='flex md:hidden'>
        <Button className='h-12 w-12' variant={"outline"} size={"icon"}>
          <Menu size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className='bg-black/10 backdrop-blur-sm flex flex-col justify-between w-full'
      >
        <div>
          <SheetHeader>
            <SheetTitle>
              <SheetClose asChild>
                <Link href={"/"}>
                  <Image
                    src={"/logo.png"}
                    height={30}
                    width={30}
                    alt={"Aheader"}
                  />
                </Link>
              </SheetClose>
            </SheetTitle>
          </SheetHeader>
          <Separator className='my-4' />
          <div className='flex items-center gap-2 mb-4'>
            <Input placeholder='Search something...' />
            <Button className='h-10 min-w-10' size={"icon"} variant={"outline"}>
              <Search size={16} />
            </Button>
          </div>
          <nav className='flex flex-col gap-2'>
            {selectedCategories.map((category, i) => (
              <SheetClose asChild key={i}>
                <Link
                  className='text-zinc-500 hover:text-foreground ease-out duration-300 w-fit'
                  href={`/products?category=${category.toLowerCase()}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </div>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-2'>
            <Button className='h-8 w-8' size={"icon"} variant={"outline"}>
              <Facebook size={16} />
            </Button>
            <Button className='h-8 w-8' size={"icon"} variant={"outline"}>
              <Instagram size={16} />
            </Button>
            <Button className='h-8 w-8' size={"icon"} variant={"outline"}>
              <Linkedin size={16} />
            </Button>
            <Button className='h-8 w-8' size={"icon"} variant={"outline"}>
              <Youtube size={16} />
            </Button>
          </div>
          <Button className='' variant={"link"}>
            Login/Register
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
