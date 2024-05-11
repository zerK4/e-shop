import Header from "@/components/header";
import React from "react";
import { getAllCategories } from "../actions/productActions";
import Footer from "@/components/footer";

async function Mainlayout({ children }: { children: React.ReactNode }) {
  const { categories } = await getAllCategories();

  return (
    <div>
      <Header categories={categories} />
      {children}
      <Footer />
    </div>
  );
}

export default Mainlayout;
