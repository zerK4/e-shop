import { Card } from "@/components/ui/card";
import { Hero } from "@/components/hero";
import { getAllProducts, getHeroProducts } from "../actions/productActions";
import { ProductsBanner } from "@/components/productBanner";

export default async function Home() {
  const { products } = await getHeroProducts();
  const { products: allProducts } = await getAllProducts();
  console.log(products);
  return (
    <div className='px-6 overflow-hidden'>
      <Hero products={products} />
      <ProductsBanner products={allProducts} />
    </div>
  );
}
