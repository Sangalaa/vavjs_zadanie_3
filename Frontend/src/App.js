import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import * as ROUTES from './constants/routes'

const Products = lazy(() => import('./pages/products'))

export default function App() {
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path={ ROUTES.PRODUCTS } element={<Products />} />
        </Routes>
      </Suspense>
    </Router>
  );
}