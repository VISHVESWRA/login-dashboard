import { useDispatch } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import Header from "./Header";
import { Menu, X, Power } from "lucide-react";

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    if (confirm("Are you sure?")) {
      dispatch(logout());
      navigate("/");
    }
  };

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    // <div className="flex min-h-screen bg-gray-100">
    //   <div className="sm:hidden w-full flex items-center justify-between bg-white p-4 shadow">
    //     <h1 className="text-2xl font-bold">Dashboard</h1>

    //     <button onClick={() => setOpen(!open)} className="p-2 border rounded">
    //       ☰
    //     </button>
    //   </div>

    //   {/* Sidebar */}
    //   <aside
    //     className={`fixed lg:static bg-white shadow-lg p-5 w-64 h-full transition-transform duration-300
    //     ${
    //       open ? "translate-x-0 h-full" : "-translate-x-full lg:translate-x-0"
    //     }`}
    //   >
    //     <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

    //     <nav className="space-y-3">
    //       {/* <Link
    //         to="new-user"
    //         className="block p-2 rounded-lg hover:bg-blue-100"
    //       >
    //         ➕ New User
    //       </Link> */}

    //       <Link
    //         to="user-list"
    //         className="block p-2 rounded-lg hover:bg-blue-100"
    //       >
    //         👥 User List
    //       </Link>
    //     </nav>

    //     <button
    //       onClick={handleLogout}
    //       className="mt-10 w-full bg-red-600 py-2 rounded hover:bg-red-700"
    //     >
    //       Logout
    //     </button>
    //   </aside>

    //   {/* Main Content */}
    //   <main className="flex-1 p-6">
    //     <Outlet />
    //   </main>
    // </div>

    // <div className="flex h-screen bg-gray-100 overflow-hidden">
    //   {/* Sidebar */}
    //   <Sidebar open={open} setOpen={setOpen} />

    //   {/* Main Content Area */}
    //   <div className="flex flex-col flex-1 md:hidden">
    //     {/* Top Header */}
    //     <div className="h-14 bg-white shadow flex items-center px-4 gap-4">
    //       {/* Mobile Menu Button */}
    //       <button onClick={() => setOpen(true)} className="md:hidden">
    //         {/* <Header size={28} /> */}☰
    //       </button>

    //       <h1 className="text-xl font-semibold">Dashboard</h1>
    //     </div>
    //   </div>

    //   {/* Outlet */}
    //   <main className="flex-1 overflow-y-auto p-4">
    //     <Outlet />
    //   </main>
    // </div>

    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-lg p-5">
        <div className="flex flex-row items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Power className="text-red-600" onClick={handleLogout} />
        </div>

        <nav className="space-y-3 overflow-y-auto h-[30vh] sm:h-full">
          <Link
            to="/dashboard/user-list"
            className="block p-2 rounded-lg hover:bg-blue-100"
          >
            Users
          </Link>
          <Link
            to="/dashboard/todo-list"
            className="block p-2 rounded-lg hover:bg-blue-100"
          >
            Todo List
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
