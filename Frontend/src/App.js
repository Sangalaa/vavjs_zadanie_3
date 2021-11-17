import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import * as ROUTES from './constants/routes'

const Products = lazy(() => import('./pages/products'))
const Checkout = lazy(() => import('./pages/checkout'))

export default function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path={ ROUTES.PRODUCTS } element={<Products />} />
          <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
        </Routes>
      </Suspense>
    </Router>
  );
}