import { Product } from "@/types/product";
import axios from "axios";
import Image from "next/image";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export default async function SingleProductPage({
  params,
}: {
  params: Params;
}) {
  try {
    const { id } = await params;
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    if (response.status !== 200) {
      return notFound();
    }

    const product: Product = response.data;
    console.log("Product: ", product);

    return (
      <div>
        <div>
          <div>
            <Image
              src={product.images[0]}
              width={600}
              height={600}
              alt={product.title}
            />
          </div>
          <div>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return notFound();
  }
}
