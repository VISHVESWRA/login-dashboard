import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../../features/users/userSlice";
import { Link } from "react-router-dom";

export default function UserList() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10; // ⭐ You can change this

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteUser(id));
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchValue = searchTerm.toLowerCase();

    return (
      (user?.name || "").toLowerCase().includes(searchValue) ||
      (user?.email || "").toLowerCase().includes(searchValue) ||
      (user?.phone || "").toLowerCase().includes(searchValue) ||
      (user?.role || "").toLowerCase().includes(searchValue)
    );
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const valA = a[sortField]?.toString().toLowerCase();
    const valB = b[sortField]?.toString().toLowerCase();

    if (sortOrder === "asc") return valA > valB ? 1 : -1;
    return valA < valB ? 1 : -1;
  });

  // ⭐ Pagination
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page if search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Users</h1>
        <Link
          to="/dashboard/new-user"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add User
        </Link>
      </div>

      {/* Search + Sort */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <select
          className="border p-2 rounded"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="email">Sort by Email</option>
          <option value="role">Sort by Role</option>
        </select>

        <select
          className="border p-2 rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan="6" className="text-center p-3">
                Loading...
              </td>
            </tr>
          )}

          {paginatedUsers?.map((user) => (
            <tr key={user._id} className="text-center border">
              <td className="p-2 border">
                {user.profile_image ? (
                  <img
                    src={user.profile_image}
                    className="w-10 h-10 rounded-full mx-auto"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 mx-auto"></div>
                )}
              </td>

              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.phone}</td>
              <td className="p-2 border capitalize">{user.role}</td>

              <td className="p-2 border">
                <Link
                  to={`/dashboard/edit-user/${user._id}`}
                  className="text-blue-600 font-medium mr-3"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-600 font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {paginatedUsers.length === 0 && !loading && (
            <tr>
              <td colSpan="6" className="text-center p-3">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ⭐ Pagination Controls */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-40"
        >
          Prev
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
