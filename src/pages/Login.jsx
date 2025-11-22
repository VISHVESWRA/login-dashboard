import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then((payload) => {
        console.log("Logged in user:", payload.user);
        navigate("/dashboard", { replace: true }); // ✅ Navigate
      })
      .catch((err) => {
        console.log("Login error:", err);
      });
  };

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex items-center justify-center min-height-screen min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className={`w-full p-2 border rounded-lg 
              ${errors.email ? "border-red-500" : "border-gray-300"}
              focus:outline-none focus:ring-2 focus:ring-blue-300`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className={`w-full p-2 border rounded-lg 
              ${errors.password ? "border-red-500" : "border-gray-300"}
              focus:outline-none focus:ring-2 focus:ring-blue-300`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Register redirect */}
        <p
          onClick={() => navigate("/register")}
          className="mt-4 text-center text-blue-600 cursor-pointer"
        >
          Create an account
        </p>
      </form>
    </div>
  );
}
