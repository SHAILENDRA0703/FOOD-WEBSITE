import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useContext } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import AdminLayout from './layouts/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminMenuPage from './pages/admin/AdminMenuPage';
import CartIcon from './components/CartIcon';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-white shadow">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">MyOnlineMeal</Link>
            <nav className="flex items-center">
              <Link to="/" className="text-gray-600 hover:text-gray-800 mx-2">Home</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-800 mx-2">Contact</Link>
              {user ? (
                <>
                  <Link to="/admin" className="text-gray-600 hover:text-gray-800 mx-2">Admin</Link>
                  <button onClick={logout} className="text-gray-600 hover:text-gray-800 mx-2">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-gray-800 mx-2">Login</Link>
                  <Link to="/register" className="text-gray-600 hover:text-gray-800 mx-2">Sign Up</Link>
                </>
              )}
              <CartIcon />
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="menu" element={<AdminMenuPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
