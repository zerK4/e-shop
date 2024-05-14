import Header from "@/components/header";
import React from "react";
import { getAllCategories } from "../actions/productActions";
import Footer from "@/components/footer";

async function Mainlayout({ children }: { children: React.ReactNode }) {
  const { categories } = await getAllCategories();

  return (
    <div className='max-w-7xl grid grid-cols-1 mx-auto'>
      <Header categories={categories} />
      <div className=''>{children}</div>
      <Footer />
    </div>
  );
}

export default Mainlayout;
