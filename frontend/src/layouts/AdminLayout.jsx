import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
      {/* You can add a sidebar or other admin-specific layout components here */}
      <Outlet />
    </div>
  );
};

export default AdminLayout;
