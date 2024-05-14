import { Facebook, Heart, Instagram, Linkedin, Youtube } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import Image from "next/image";

function Footer() {
  return (
    <div className='pb-14 flex px-6 items-start relative flex-col pt-6 m-2 border rounded-md bg-black'>
      <div className='flex flex-col md:flex-row justify-between gap-2 md:items-center w-full z-20 mb-4'>
        <div className='text-2xl font-bold'>
          <Image src={"/logo.png"} height={30} width={30} alt={"Aheader"} />
        </div>
        <div className='flex items-center gap-2'>
          <Input placeholder='Enter your email' />
          <Button className=''>Subscribe</Button>
        </div>
      </div>
      <div className='backdrop-blur-sm w-full h-full z-10'>
        <div className='z-50 flex flex-col gap-2 w-fit'>
          <Link
            className='hover:text-foreground ease-in-out duration-300 w-full hover:pl-4'
            href='/'
          >
            Home
          </Link>
          <Link
            className='hover:text-foreground ease-in-out duration-300 w-full hover:pl-4'
            href='/about'
          >
            About
          </Link>
          <Link
            className='hover:text-foreground ease-in-out duration-300 w-full hover:pl-4'
            href='/terms-conditions'
          >
            Terms &amp; Conditions
          </Link>
          <Link
            className='hover:text-foreground ease-in-out duration-300 w-full hover:pl-4'
            href='/shipping-return-policy'
          >
            Shipping &amp; Return Policy
          </Link>
          <Link
            className='hover:text-foreground ease-in-out duration-300 w-full hover:pl-4'
            href='/privacy-policy'
          >
            Privacy Policy
          </Link>
          <Link
            className='hover:text-foreground ease-in-out duration-300 w-full hover:pl-4'
            href='/frequently-asked-questions'
          >
            FAQ
          </Link>
        </div>
      </div>
      <div className='absolute h-full w-full top-0 left-0 justify-center items-center flex'>
        <h2 className='text-[3rem] sm:text-[5rem] opacity-20'>aheader</h2>
        <Image src={"/logo.png"} height={50} width={50} alt={"Aheader"} />
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
