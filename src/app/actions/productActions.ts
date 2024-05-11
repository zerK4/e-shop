"use server";

import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://e-shop-s-pavel.vercel.app";

export async function getAllCategories() {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/products`);

    if (data.length === 0) return { categories: [] };

    const categories = new Set(
      (data as Product[])
        .map((x: any) => x.category)
        .filter((x, i, self) => self.indexOf(x) === i)
    );

    return { categories };
  } catch (error) {
    console.log(error);

    return { categories: [] };
  }
}

export async function getHeroProducts() {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/products`);

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

    return { products: data };
  } catch (error) {
    console.log(error);

    return { products: [] };
  }
}
