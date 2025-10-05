// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export function Navbar() {
  const { state } = useCart();

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} component="div">
            <Link color="error" to="/">
              <Typography color="white">Home</Typography>
            </Link>
          </Box>
          <Link to="/cart">
            <Typography color="white">
              <ShoppingCartIcon />
              Cart ({totalItems})
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
