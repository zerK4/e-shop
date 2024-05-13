"use server";

import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://e-shop-s-pavel.vercel.app";

export async function getAllCategories() {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/products`);
    if (data.length === 0) return { categories: [] };

    const categories = new Set((data as Product[]).map((x: any) => x.category));

    return { categories };
  } catch (error) {
    console.log(error);

    return { categories: [] };
  }
}

export async function getHeroProducts() {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/products`);
    if (data.length === 0) return { products: [] };

    return {
      products: data.splice(0, 3),
    };
  } catch (error) {
    console.log(error);

    return { products: [] };
  }
}

export async function getAllProducts() {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/products`);
    if (data.length === 0) return { products: [] };

    return { products: data };
  } catch (error) {
    console.log(error);

    return { products: [] };
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/products`);
    if (data.length === 0) return { product: [] };

    const product = data.find((x: any) => x.slug === slug);

    return { product };
  } catch (error) {
    console.log(error);

    return { product: null };
  }
}

export async function getProductByCategory(category?: string) {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/products`);
    if (data.length === 0) return { products: [] };

    if (category) {
      const products = data.filter((x: any) => x.category === category);
      return { products };
    }

    return { products: data };
  } catch (error) {
    console.log(error);

    return { products: [] };
  }
}

export async function getAllBrands() {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/products`);
    if (data.length === 0) return { brands: [] };

    const brands = new Set((data as Product[]).map((x: Product) => x.vendor));

    return { brands };
  } catch (error) {
    console.log(error);

    return { brands: [] };
  }
}
