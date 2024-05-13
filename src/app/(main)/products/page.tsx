import {
  getAllBrands,
  getAllCategories,
  getProductByCategory,
} from "@/app/actions/productActions";
import React from "react";
import ClientPage from "./client.page";
import FilterComponent from "@/components/filterComponent";

async function page({
  searchParams,
}: {
  searchParams: { category: string | undefined };
}) {
  console.log(searchParams, "tjhe params");
  const { products } = await getProductByCategory(
    searchParams.category !== "all" && searchParams.category
      ? searchParams.category
      : undefined
  );

  const { categories } = await getAllCategories();
  const { brands } = await getAllBrands();

  console.log(products);
  return (
    <div className='flex flex-col lg:flex-row gap-2 px-6'>
      <FilterComponent categories={categories} brands={brands} />
      <ClientPage products={products} />
    </div>
  );
}

export default page;
