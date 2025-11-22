import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // back to login page
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <nav className="space-y-3">
          {/* <Link
            to="new-user"
            className="block p-2 rounded-lg hover:bg-blue-100"
          >
            ➕ New User
          </Link> */}

          <Link
            to="user-list"
            className="block p-2 rounded-lg hover:bg-blue-100"
          >
            👥 User List
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 w-full bg-red-600 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
