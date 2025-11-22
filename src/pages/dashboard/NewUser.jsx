import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedUser,
  createUser,
  getUserById,
  updateUser,
} from "../../features/users/userSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function NewUser() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedUser, loading } = useSelector((state) => state.users);
  const { users } = useSelector((state) => state.users);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      profile_image: "",
      address: "",
      state: "",
      country: "",
      city: "",
      pincode: "",
      role: "user",
    },
  });

  // Load user on edit
  useEffect(() => {
    if (id) dispatch(getUserById(id));
  }, [id, dispatch]);

  // Prefill form on edit
  useEffect(() => {
    if (selectedUser && id) reset(selectedUser);
  }, [selectedUser, id, reset]);

  useEffect(() => {
    if (!id) {
      dispatch(clearSelectedUser());
      reset({
        name: "",
        email: "",
        phone: "",
        password: "",
        profile_image: "",
        address: "",
        state: "",
        country: "",
        city: "",
        pincode: "",
        role: "user",
      });
    }
  }, [id]);

  useEffect(() => {
    if (!id) {
      dispatch(clearSelectedUser());
      reset({
        name: "",
        email: "",
        phone: "",
        password: "",
        profile_image: "",
        address: "",
        state: "",
        country: "",
        city: "",
        pincode: "",
        role: "user",
      });
    }
  }, [id]);

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setValue("profile_image", reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const onSubmit = (data) => {
    const emailExists = users.find(
      (u) =>
        u.email.toLowerCase() === data.email.toLowerCase() &&
        u._id !== selectedUser?._id // ignore current user when editing
    );

    if (emailExists) {
      alert("Email already exists!");
      return;
    }

    const phoneExists = users.find(
      (u) => u.phone === data.phone && u._id !== selectedUser?._id
    );

    if (phoneExists) {
      alert("Phone already exists!");
      return;
    }

    if (id) {
      console.log(data);

      dispatch(updateUser({ id, data })).then(() =>
        navigate("/dashboard/user-list")
      );
    } else {
      console.log("createUser");

      dispatch(createUser(data)).then(() => navigate("/dashboard/user-list"));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h1 className="text-3xl font-bold mb-6">
        {id ? "Edit User" : "Create New User"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        {/* Name */}
        <div className="col-span-2">
          <label className="font-medium">Name</label>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
              pattern: {
                value: /^[A-Za-z\s]+$/i,
                message: "Name can only contain alphabets",
              },
            })}
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="col-span-2">
          <label>Email *</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
              validate: (value) =>
                !users.find(
                  (u) => u.email === value && u._id !== selectedUser?._id
                ) || "Email already exists",
            })}
            className="w-full border p-2 rounded"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="col-span-2">
          <label>Phone *</label>
          <input
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "10-15 digits only",
              },
              validate: (value) =>
                !users.find(
                  (u) => u.phone === value && u._id !== selectedUser?._id
                ) || "Phone already exists",
            })}
            className="w-full border p-2 rounded"
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Password only for create */}
        {!id && (
          <div className="col-span-2">
            <label className="font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*\d).+$/, // Must include at least one number
                  message: "Password must include at least one number",
                },
              })}
              className="w-full border p-2 rounded"
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>
        )}

        {/* Image Upload */}
        <div className="col-span-2">
          <label className="font-medium">Profile Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full border p-2 rounded"
          />
          {watch("profile_image") && (
            <img
              src={watch("profile_image")}
              alt="preview"
              className="h-20 mt-2 rounded-md border"
            />
          )}
        </div>

        {/* Address */}
        <div className="col-span-2">
          <label className="font-medium">Address</label>
          <textarea
            {...register("address", {
              maxLength: {
                value: 150,
                message: "Address cannot exceed 150 characters",
              },
            })}
            className="w-full border p-2 rounded"
            rows={3}
          />
          {errors.address && (
            <p className="text-red-600 text-sm">{errors.address.message}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="font-medium">State</label>
          <input
            {...register("state", { required: "State is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.state && (
            <p className="text-red-600 text-sm">{errors.state.message}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="font-medium">Country</label>
          <input
            {...register("country", { required: "Country is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.country && (
            <p className="text-red-600 text-sm">{errors.country.message}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="font-medium">City</label>
          <input
            {...register("city", { required: "City is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.city && (
            <p className="text-red-600 text-sm">{errors.city.message}</p>
          )}
        </div>

        {/* Pincode */}
        <div className="col-span-2">
          <label className="font-medium">Pincode</label>
          <input
            {...register("pincode", {
              pattern: {
                value: /^[0-9]{4,10}$/,
                message: "Pincode must be 4 to 10 digits",
              },
            })}
            className="w-full border p-2 rounded"
          />
          {errors.pincode && (
            <p className="text-red-600 text-sm">{errors.pincode.message}</p>
          )}
        </div>

        {/* Role */}
        <div className="col-span-2">
          <label className="font-medium">Role</label>
          <select
            {...register("role", { required: "Role is required" })}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select Role --</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && (
            <p className="text-red-600 text-sm">{errors.role.message}</p>
          )}
        </div>

        {/* Submit */}
        <button className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {id ? "Update User" : "Create User"}
        </button>
      </form>
    </div>
  );
}
