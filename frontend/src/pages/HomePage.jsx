import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const HomePage = () => {
  const [menu, setMenu] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('http://localhost:5000/api/menu')
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(err => console.error('Error fetching menu:', err));
  }, []);

  return (
    <>
      <section className="bg-cover bg-center h-96" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')" }}>
        <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
          <div className="text-center">
            <h1 className="text-white text-4xl font-bold uppercase md:text-5xl">Welcome to MyOnlineMeal</h1>
            <p className="text-white mt-4 text-lg">Discover the best food & drinks in your city</p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Our Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menu.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-gray-800">${item.price}</span>
                  <button
                    className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold hover:bg-orange-600"
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default HomePage;
