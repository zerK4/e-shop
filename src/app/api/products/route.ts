import products from "@/data/products.json";
import { NextResponse } from "next/server";

export async function GET() {
  const data = products as any[];

  return NextResponse.json(data);
}
