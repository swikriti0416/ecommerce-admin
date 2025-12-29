// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './admin/layouts/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
// Placeholder pages (we'll build them soon)
// import ProductList from './admin/pages/Productlist';
// import OrderList from './admin/pages/Orderlist';
// import CategoryList from './admin/pages/Categorylist';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="products" element={<ProductList />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="categories" element={<CategoryList />} /> */}
        </Route>

        {/* Home/Welcome Route */}
        <Route path="/" element={
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">MyShop Admin</h1>
              <p className="text-xl">Go to <a href="/admin" className="underline font-semibold">/admin</a></p>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;