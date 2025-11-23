import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Reginster";
import DashboardLayout from "./pages/dashboard/Layout";
import NewUser from "./pages/dashboard/NewUser";
import UserList from "./pages/dashboard/UserList";
import ProtectedRoute from "./component/ProtectedRoute";
import TodoList from "./pages/todo/TodoList";

function App() {
  const { token } = useSelector((state) => state.auth);

  // Protected Route Component
  // const ProtectedRoute = ({ children }) => {
  //   if (!token) {
  //     return <Navigate to="/login" replace />;
  //   }
  //   return children;
  // };

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="user-list" replace />} />
          <Route path="new-user" element={<NewUser />} />
          <Route path="edit-user/:id" element={<NewUser />} />

          <Route path="user-list" element={<UserList />} />
          <Route path="todo-list" element={<TodoList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
