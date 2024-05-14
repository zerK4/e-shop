import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

export const ProductImageComponent = ({ product }: { product: Product }) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedImage !== -1 && carouselRef.current) {
      const selectedImageElement = carouselRef.current.children[selectedImage];

      const carouselHeight = carouselRef.current.offsetHeight;
      const imageHeight = (selectedImageElement as HTMLElement).offsetHeight;
      const offset = carouselHeight - imageHeight;

      carouselRef.current.scrollTo({
        top: (selectedImageElement as HTMLElement).offsetTop - offset + 10,
        behavior: "smooth",
      });
    }
  }, [product.images, selectedImage]);

  return (
    <div className='relative aspect-square h-full min-h-[60vh] lg:min-h-auto lg:max-h-[650px] w-full overflow-hidden'>
      <Image
        src={product.images[selectedImage]}
        alt={product.title}
        fill
        className='object-contain'
      />
      <div className='absolute top-0 left-0 flex items-center h-full'>
        <div
          ref={carouselRef}
          className='flex flex-col gap-2 overflow-y-hidden h-[30rem] z-10 py-10 md:py-0'
        >
          {product.images.map((image, i) => (
            <div
              onClick={() => setSelectedImage(i)}
              key={i}
              className={cn(
                "relative min-h-24 w-24 border border-transparent rounded-md hover:border-sky-500 ease-in-out duration-300 cursor-pointer backdrop-blur-sm bg-gray-500/10",
                i === selectedImage ? "border-sky-500" : ""
              )}
            >
              <Image
                src={image}
                alt={product.title}
                fill
                loading='eager'
                className='object-contain'
              />
            </div>
          ))}
        </div>
      </div>
      <div className='absolute bottom-[15%] flex w-full justify-center'>
        <div className='mx-auto flex h-fit items-center rounded-full text-neutral-500 backdrop-blur dark:bg-gray-500/20'>
          <Button
            className='rounded-l-full bg-transparent'
            onClick={() =>
              setSelectedImage((i) =>
                i === 0 ? product.images.length - 1 : i - 1
              )
            }
          >
            <ChevronLeft size={20} />
          </Button>
          <Separator orientation='vertical' className='h-[50%]' />
          <Button
            className='rounded-r-full bg-transparent'
            onClick={() =>
              setSelectedImage((i) =>
                i === product.images.length - 1 ? 0 : i + 1
              )
            }
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};
