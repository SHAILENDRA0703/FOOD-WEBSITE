import { useContext } from 'react';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!user) {
      alert('Please login to place an order.');
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({ menuItem: item.id, quantity: item.quantity })),
          totalPrice: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to place order');
      }

      alert('Order placed successfully!');
      clearCart();
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Checkout</h2>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <hr className="my-4" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</span>
        </div>
        <button
          className="bg-orange-500 text-white w-full py-2 rounded-full mt-6 hover:bg-orange-600"
          onClick={handlePlaceOrder}
        >
          Place Order (Dummy Payment)
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
