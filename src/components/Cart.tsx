import { useMutation } from "@apollo/client/react";
import { CREATE_ORDER } from "../graphql/mutations";
import { useCart } from "../context/CartContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function Cart() {
  const { state, dispatch, total } = useCart();
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
    <Grid size={10} offset={1}>
      <Grid size={12}>
        <Typography variant="h4">Cart</Typography>
      </Grid>
      {state.items.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <Grid size={12}>
          <Stack spacing={4}>
            {state.items.map((item) => (
              <Grid container key={item.id}>
                <Grid size={11}>
                  {item.name} × {item.quantity}
                </Grid>
                <Grid size={1} textAlign={"right"}>
                  💎{item.price * item.quantity}
                </Grid>
                <hr />
              </Grid>
            ))}
            <hr />
          </Stack>
          <Grid size={2} offset={10} textAlign={"right"}>
            <strong>Total: 💎{total}</strong>
            <Button onClick={handleCheckout} variant="contained">
              Checkout
            </Button>
          </Grid>
        </Grid>
      )}
      {data && (
        <p className="mt-3 text-green-600">
          Order placed! ID: {data.createOrder.id}, Status:{" "}
          {data.createOrder.status}
        </p>
      )}
    </Grid>
  );
}
