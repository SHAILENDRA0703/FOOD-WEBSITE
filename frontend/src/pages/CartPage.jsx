import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-white rounded-lg shadow-lg p-4 mb-4">
              <div className="flex items-center">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l"
                  onClick={() => removeFromCart(item.id)}
                >
                  -
                </button>
                <span className="px-4 py-1 bg-gray-100">{item.quantity}</span>
                <button
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r"
                  onClick={() => addToCart(item)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="text-right mt-8">
            <h3 className="text-2xl font-bold text-gray-800">Total: ${total.toFixed(2)}</h3>
            <Link to="/checkout">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-full mt-4 hover:bg-orange-600">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
