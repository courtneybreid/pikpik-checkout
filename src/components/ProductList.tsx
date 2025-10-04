import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "../graphql/queries";

type Product = {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

export default function ProductList() {
  const { loading, error, data } = useQuery<{ products: Product[] }>(GET_PRODUCTS);

  if (loading) return <p className="text-gray-500">Loading products...</p>
  if (error) return <p className="text-red-500">Error loading products: {error.message}</p>

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">The Lab</h2>
      <div>
        <ul>
          {data.products.map((product) => (
            <li key={product.id}>{product.name} | {product.price}💎</li>
          ))}
        </ul>
      </div>
    </div>
  )
}