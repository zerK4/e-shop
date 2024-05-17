"use client";

import ProductImage from "@/components/productImage";
import { ProductInterface } from "@/store/product.store";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ProductInterface["cartProducts"][0]>[] = [
  {
    accessorKey: "image",
    header: () => {
      return <div className='max-w-10' />;
    },
    cell: ({ row }) => {
      return (
        <div className='h-20 max-w-20'>
          <ProductImage product={row.original.product} className='w-20' />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div>{row.original.product.title}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
  },
];
