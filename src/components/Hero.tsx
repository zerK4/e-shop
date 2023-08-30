"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

function Hero({ images }: { images: string[] }) {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-primary flex items-center justify-center controlledWidth p-10 pr-0 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center w-full">
          <div className="flex flex-col w-full lg:w-1/3 justify-center items-start">
            <h1 className="text-3xl md:text-5xl p-2 text-yellow-300 tracking-loose">
              Get yourself something nice!
            </h1>
            <h2 className="text-3xl md:text-5xl leading-relaxed md:leading-snug mb-2">
              Space : The Timeless Infinity
            </h2>
            <p className="text-sm md:text-base text-secondary">
              Explore your favourite events and register now to showcase your
              talent and win exciting prizes.
            </p>
            <Button className="mt-10 bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent">
              Explore Now
            </Button>
          </div>
          <div className="flex-grow flex justify-end flex-wrap">
            {images.slice(0, 3).map((image, index) => {
              console.log(index, "index here");

              const displacementValue =
                index === 0
                  ? (index + 4) * 20
                  : index === 1
                  ? (index - 1) * 20
                  : (index + 2) * 20;

              return (
                <motion.div
                  key={index}
                  initial={{ y: 0, rotateX: 0, scale: 3, opacity: 0 }}
                  animate={{
                    y: `${
                      index === 0 ? -displacementValue : displacementValue
                    }px`,
                    rotate: 20,
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    type: "keyframes",
                    duration: 2,
                  }}
                  className={`p-4 h-fit w-fit md:min-h-[400px] items-center ${
                    index === 2
                      ? "hidden 2xl:flex"
                      : index === 1
                      ? "hidden md:flex border-x"
                      : ""
                  }`}
                >
                  <div className="relative h-60 min-w-[200px] w-full 3xl:h-72 3xl:w-52 overflow-hidden">
                    <Image
                      src={image || "/next.svg"}
                      fill
                      alt="Hero image"
                      className="object-contain overflow-hidden"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
