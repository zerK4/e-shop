import Hero from "@/components/Hero";
import axios from "axios";
import Image from "next/image";
import shuffle from "lodash.shuffle";

const getProducts = async () => {
  const { data } = await axios({
    method: "GET",
    url: "https://fakestoreapi.com/products",
  });

  return data;
};

const getImages = async () => {
  const products = await getProducts();
  const images = products.map((product: any) => product.image);

  return shuffle(images);
};

export default async function Home() {
  const images = await getImages();
  return (
    <div className="">
      <Hero images={images} />
    </div>
  );
}
