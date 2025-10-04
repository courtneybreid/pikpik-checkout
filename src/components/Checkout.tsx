import { useMutation } from "@apollo/client/react";
import { CREATE_ORDER } from "../graphql/mutations";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { state, dispatch } = useCart();
  const [createOrder, { loading, error, data }] = useMutation(CREATE_ORDER);

  const handleCheckout = async () => {
    const productIds = state.items.flatMap((item) =>
      Array(item.quantity).fill(item.id)
    );
    await createOrder({ variables: { productIds } });
    dispatch({ type: "CLEAR" });
  };

  if (loading) return <p>Processing order...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4 border-t mt-6">
      <h2 className="text-lg font-bold mb-2">Cart</h2>
      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="mb-3">
            {state.items.map((item) => (
              <li key={item.id}>
                {item.name} × {item.quantity} (${item.price * item.quantity})
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
        </div>
      )}
      {data && (
        <p className="mt-3 text-green-600">
          Order placed! ID: {data.createOrder.id}, Status: {data.createOrder.status}
        </p>
      )}
    </div>
  );
}
