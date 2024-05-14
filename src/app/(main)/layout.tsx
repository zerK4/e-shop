import Header from "@/components/header";
import React from "react";
import { getAllBrands, getAllCategories } from "../actions/productActions";
import Footer from "@/components/footer";

async function Mainlayout({ children }: { children: React.ReactNode }) {
  const { categories } = await getAllCategories();
  const { brands } = await getAllBrands();

  return (
    <div className='max-w-7xl grid grid-cols-1 mx-auto py-2 lg:py-0'>
      <Header categories={categories} brands={brands} />
      <div className=''>{children}</div>
      <Footer />
    </div>
  );
}

export default Mainlayout;
