import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";

export default function Sidebar({ open, setOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <>
        {/* Mobile Overlay */}
        {open && (
          <div
            className="fixed inset-0 bg-black/40 z-20 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}

        <aside
          className={`fixed z-30 bg-white shadow-lg h-full w-64 p-5 
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0`}
        >
          <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

          <nav className="space-y-4">
            <Link
              to="user-list"
              className="flex items-center gap-2 text-lg hover:text-purple-600"
            >
              User List
            </Link>
          </nav>
          <nav className="space-y-4">
            <Link
              to="todo-list"
              className="flex items-center gap-2 text-lg hover:text-purple-600"
            >
              Todo List
            </Link>
          </nav>

          <button
            onClick={handleLogout}
            className="w-full mt-10 bg-red-600 text-white py-2 rounded"
          >
            Logout
          </button>
        </aside>
      </>
    </>
  );
}
