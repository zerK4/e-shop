import React from "react";
import { Navigation } from "./Navigation";
import axios from "axios";

const getCategories = async () => {
  const { data } = await axios({
    method: "GET",
    url: "https://fakestoreapi.com/products/categories",
  });

  const { data: items } = await axios({
    method: "GET",
    url: "https://fakestoreapi.com/products",
  });

  const categories = data.map((x: string) => {
    const nam = x.split("'")[0];
    const name = nam.charAt(0).toUpperCase() + nam.slice(1);
    const link = x.replace("'", "").replace(" ", "-");
    const image = items.find((y: any) => y.category === x);

    console.log(image.image);

    return {
      name: name,
      link: link,
      image: image.image,
    };
  });

  return categories;
};

async function Header() {
  const categories: any = await getCategories();
  return (
    <div className="flex px-2 h-20 justify-center items-center">
      <div className="flex h-20 justify-between items-center controlledWidth">
        <div className="">Logo</div>
        <div className="flex gap-4 items-center">
          <Navigation categories={JSON.stringify(categories)} />
        </div>
      </div>
    </div>
  );
}

export default Header;
