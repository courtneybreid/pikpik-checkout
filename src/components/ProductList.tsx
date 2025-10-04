import * as React from 'react';
import { useQuery } from "@apollo/client/react";
import { GET_PRODUCTS } from "../graphql/queries";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


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

  //TODO: Pull Product Card out into its own component

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">The Lab</h2>
      <div>
          {data.products.map((product) => (
            <Card key={product.id}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary'}}>
                  {product.name}
                </Typography>
                <Typography variant="h6" component="div">
                  {product.price}💎  
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="medium" variant="contained" color="primary">
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          ))}
      </div>
    </div>
  )
}