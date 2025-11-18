import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const AdminMenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '', imageUrl: '', category: '' });
  const [editingItem, setEditingItem] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/menu');
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Something went wrong');
        }
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/menu/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(newItem),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      setMenuItems([...menuItems, data]);
      setNewItem({ name: '', price: '', description: '', imageUrl: '', category: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/menu/update/${editingItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(editingItem),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      setMenuItems(menuItems.map(item => (item.id === data.id ? data : item)));
      setEditingItem(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/menu/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to delete item');
      }
      setMenuItems(menuItems.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Manage Menu</h2>

      {/* Add/Edit Forms */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
        <form onSubmit={editingItem ? handleUpdateItem : handleAddItem} className="bg-white rounded-lg shadow-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input type="text" placeholder="Name" className="px-4 py-2 border rounded" value={editingItem ? editingItem.name : newItem.name} onChange={(e) => editingItem ? setEditingItem({...editingItem, name: e.target.value}) : setNewItem({ ...newItem, name: e.target.value })} required />
            <input type="number" placeholder="Price" className="px-4 py-2 border rounded" value={editingItem ? editingItem.price : newItem.price} onChange={(e) => editingItem ? setEditingItem({...editingItem, price: e.target.value}) : setNewItem({ ...newItem, price: e.target.value })} required />
            <input type="text" placeholder="Description" className="px-4 py-2 border rounded" value={editingItem ? editingItem.description : newItem.description} onChange={(e) => editingItem ? setEditingItem({...editingItem, description: e.target.value}) : setNewItem({ ...newItem, description: e.target.value })} />
            <input type="text" placeholder="Image URL" className="px-4 py-2 border rounded" value={editingItem ? editingItem.imageUrl : newItem.imageUrl} onChange={(e) => editingItem ? setEditingItem({...editingItem, imageUrl: e.target.value}) : setNewItem({ ...newItem, imageUrl: e.target.value })} />
            <input type="text" placeholder="Category" className="px-4 py-2 border rounded" value={editingItem ? editingItem.category : newItem.category} onChange={(e) => editingItem ? setEditingItem({...editingItem, category: e.target.value}) : setNewItem({ ...newItem, category: e.target.value })} />
          </div>
          <button type="submit" className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            {editingItem ? 'Update Item' : 'Add Item'}
          </button>
          {editingItem && <button onClick={() => setEditingItem(null)} className="mt-4 ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>}
        </form>
      </div>

      {/* Menu Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full bg-white">
          {/* Table headers */}
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 text-left">Name</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Price</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Description</th>
              <th className="py-2 px-4 bg-gray-200 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map(item => (
              <tr key={item.id}>
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b">${item.price}</td>
                <td className="py-2 px-4 border-b">{item.description}</td>
                <td className="py-2 px-4 border-b">
                  <button onClick={() => setEditingItem(item)} className="text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDeleteItem(item.id)} className="text-red-500 hover:underline ml-4">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMenuPage;
