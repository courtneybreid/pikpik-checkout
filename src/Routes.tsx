import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import ProductList from "./components/ProductList";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
    </Routes>
  );
}