import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "../graphql/queries";
import { useCart } from "../context/CartContext";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

type Product = {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  photo: string;
};

export default function ProductList() {
  const { loading, error, data } = useQuery<{ products: Product[] }>(
    GET_PRODUCTS
  );
  const { dispatch } = useCart();

  if (loading) return <p className="text-gray-500">Loading products...</p>;
  if (error)
    return (
      <p className="text-red-500">Error loading products: {error.message}</p>
    );

  //TODO: Pull Product Card out into its own component

  return (
    <>
      <Grid size={12}>
        <Typography variant="h2">The Lab</Typography>
      </Grid>
      {data?.products?.map((product) => (
        <Grid size={3}>
          <Card key={product.id}>
            <CardMedia
              component="img"
              height="200"
              image={product.photo}
              alt={product.name}
              sx={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "text.secondary" }}
              >
                {product.name}
              </Typography>
              <Typography variant="h6" component="div">
                💎{product.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                onClick={() =>
                  dispatch({
                    type: "ADD",
                    product: {
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      photo: product.photo,
                    },
                  })
                }
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </>
  );
}
