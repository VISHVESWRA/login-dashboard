import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    dispatch(registerUser(formData)).then((res) => {
      if (res.type === "auth/registerUser/fulfilled") {
        navigate("/login");
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* NAME */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border p-2 rounded-lg"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* EMAIL */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border p-2 rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* PHONE */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="number"
            {...register("phone", { required: "Phone number is required" })}
            className="w-full border p-2 rounded-lg"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full border p-2 rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* ROLE */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Role</label>
          <select
            {...register("role", { required: "Role is required" })}
            className="w-full border p-2 rounded-lg"
          >
            <option value="">Select role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        {/* PROFILE IMAGE */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Profile Image</label>
          <input
            type="file"
            {...register("profile_image", { required: "Image is required" })}
            className="w-full border p-2 rounded-lg"
          />
          {errors.profile_image && (
            <p className="text-red-500 text-sm">
              {errors.profile_image.message}
            </p>
          )}
        </div>

        {/* ADDRESS */}
        <div className="grid grid-cols-2 gap-3">
          <div className="mb-3">
            <label className="block mb-1 font-medium">Address</label>
            <input
              type="text"
              {...register("address", { required: "Address required" })}
              className="w-full border p-2 rounded-lg"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="block mb-1 font-medium">City</label>
            <input
              type="text"
              {...register("city", { required: "City is required" })}
              className="w-full border p-2 rounded-lg"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="block mb-1 font-medium">State</label>
            <input
              type="text"
              {...register("state", { required: "State is required" })}
              className="w-full border p-2 rounded-lg"
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label className="block mb-1 font-medium">Country</label>
            <input
              type="text"
              {...register("country", { required: "Country is required" })}
              className="w-full border p-2 rounded-lg"
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>

          <div className="mb-3 col-span-2">
            <label className="block mb-1 font-medium">Pincode</label>
            <input
              type="number"
              {...register("pincode", { required: "Pincode is required" })}
              className="w-full border p-2 rounded-lg"
            />
            {errors.pincode && (
              <p className="text-red-500 text-sm">{errors.pincode.message}</p>
            )}
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p
          onClick={() => navigate("/login")}
          className="mt-4 text-center text-blue-600 cursor-pointer"
        >
          Already have an account? Login
        </p>
      </form>
    </div>
  );
}
