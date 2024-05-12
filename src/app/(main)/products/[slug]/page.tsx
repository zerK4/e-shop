import { getProductBySlug } from "@/app/actions/productActions";
import React from "react";
import ClientPage from "./client.page";

async function page({ params }: { params: { slug: string } }) {
  const { product } = await getProductBySlug(params.slug);

  return <ClientPage product={product} />;
}

export default page;
