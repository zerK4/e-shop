import { Facebook, Heart, Instagram, Linkedin, Youtube } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function Footer() {
  return (
    <div className='pb-14 flex px-4 items-start relative'>
      <div className='z-50 flex flex-col gap-4 backdrop-blur-sm w-full'>
        <Link
          className='text-zinc-500 hover:text-foreground ease-in-out duration-300 border-b w-full hover:border-foreground hover:pl-4'
          href='/'
        >
          Home
        </Link>
        <Link
          className='text-zinc-500 hover:text-foreground ease-in-out duration-300 border-b w-full hover:border-foreground hover:pl-4'
          href='/about'
        >
          About
        </Link>
        <Link
          className='text-zinc-500 hover:text-foreground ease-in-out duration-300 border-b w-full hover:border-foreground hover:pl-4'
          href='/terms-conditions'
        >
          Terms &amp; Conditions
        </Link>
        <Link
          className='text-zinc-500 hover:text-foreground ease-in-out duration-300 border-b w-full hover:border-foreground hover:pl-4'
          href='/shipping-return-policy'
        >
          Shipping &amp; Return Policy
        </Link>
        <Link
          className='text-zinc-500 hover:text-foreground ease-in-out duration-300 border-b w-full hover:border-foreground hover:pl-4'
          href='/privacy-policy'
        >
          Privacy Policy
        </Link>
        <Link
          className='text-zinc-500 hover:text-foreground ease-in-out duration-300 border-b w-full hover:border-foreground hover:pl-4'
          href='/frequently-asked-questions'
        >
          FAQ
        </Link>
      </div>
      <div className='absolute h-full w-full top-0 left-0 justify-center items-center flex'>
        <h2 className='text-[5rem]'>aheader</h2>
      </div>
      <div className='absolute bottom-0 left-0 w-full px-6 py-2 flex justify-between items-center'>
        <span className='flex items-center gap-2'>
          Made with <Heart size={12} className='stroke-red-500 fill-red-500' />
        </span>
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
      </div>
    </div>
  );
}

export default Footer;
