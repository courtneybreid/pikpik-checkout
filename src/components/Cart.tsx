import { useMutation } from "@apollo/client/react";
import { CREATE_ORDER } from "../graphql/mutations";
import { useCart } from "../context/CartContext";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Stack,
} from "@mui/material";

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
        <Grid size={8} offset={1}>
          <Stack spacing={4}>
            {state.items.map((item) => (
              <Box key={item.id}>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.photo}
                    alt={item.name}
                    sx={{
                      height: 150,
                      width: 150,
                      objectFit: "contain",
                    }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Box>
                      <ButtonGroup
                        variant="contained"
                        aria-label="Controls for quantity of {item.name}"
                        size="small"
                      >
                        <Button
                          aria-label="Decrease quantity by one"
                          onClick={() =>
                            dispatch({ type: "DECREMENT", id: item.id })
                          }
                        >
                          -
                        </Button>
                        <Button variant="outlined">{item.quantity}</Button>
                        <Button
                          aria-label="Increase quantity by one"
                          onClick={() =>
                            dispatch({ type: "INCREMENT", id: item.id })
                          }
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </Box>
                  </CardContent>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      minWidth: "70px",
                      pr: 2,
                      textAlign: "right",
                    }}
                  >
                    💎{item.price * item.quantity}
                  </Typography>
                </Card>
              </Box>
            ))}
            <hr />
          </Stack>
          <Grid size={4} offset={8} textAlign={"right"}>
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
