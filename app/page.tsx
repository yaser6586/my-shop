import Image from "next/image";
import { getAllProduct } from "./lib/data";
import { ProductType } from "./lib/definations";
import ProductCard from "./ui/main/ProductCard";

import { authOptions } from "./api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const products = await getAllProduct();
  const session = await getServerSession(authOptions);
  console.log(session?.user?.userId);
  return (
    <div className="pt-10 flex flex-col justify-center w-full">
      <div
        className="grid grid-cols-1 gap-4 justify-center md:grid-cols-2 
   lg:grid-cols-3 min-h-screen p-3  "
      >
        {products.map((product) => (
          <ProductCard key={product.id} productData={product as ProductType} />
        ))}
      </div>
    </div>
  );
}
