import { Routes, Route } from 'react-router-dom';
import ProductList from "./components/ProductList";
import Checkout from "./components/Checkout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/cart" element={<Checkout />} />
    </Routes>
  );
}