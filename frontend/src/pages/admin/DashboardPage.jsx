import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/orders" className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-800">View Orders</h3>
          <p className="text-gray-600 mt-2">See all the orders that have been placed.</p>
        </Link>
        <Link to="/admin/menu" className="bg-white rounded-lg shadow-lg p-6 text-center hover:bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-800">Manage Menu</h3>
          <p className="text-gray-600 mt-2">Add, edit, or delete menu items.</p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
