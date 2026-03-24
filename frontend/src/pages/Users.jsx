import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { hasPermission } from "../utils/permission";
import Layout from "../components/Layout";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [department, setDepartment] = useState("");
    const [editUser, setEditUser] = useState(null);

    const [roles, setRoles] = useState([]);
    const [departments, setDepartments] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/api/users");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMeta = async () => {
        const rolesRes = await API.get("/api/roles");
        const deptRes = await API.get("/api/departments");

        setRoles(rolesRes.data);
        setDepartments(deptRes.data);
};

const handleDelete = async (id) => {
  await API.delete(`/api/users/${id}`);
  fetchUsers();
};

  useEffect(() => {
    fetchUsers();
    fetchMeta();
  }, []);

  const handleCreateUser = async () => {
  await API.post("/api/users", {
    name,
    email,
    password,
    role,
    department
  });

  fetchUsers();
};

const handleUpdate = async () => {
  await API.put(`/api/users/${editUser._id}`, {
    role: editUser.role,
    department: editUser.department
  });

  setEditUser(null);
  fetchUsers();
};

  return (
   
  <div>
    {/* Title */}
    <h2 className="text-2xl font-semibold mb-6 text-gray-700">
      User Management
    </h2>

    {/* Card */}
    <div className="bg-white shadow-lg rounded-xl p-6">

      {/* CREATE USER FORM */}
      {hasPermission(user, "create_user") && (
        <div className="grid md:grid-cols-6 gap-3 mb-6">

          <input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
          />

          <input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
          />

          {/* Role */}
          <select
            onChange={(e) => setRole(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option>Select Role</option>
            {roles.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name}
              </option>
            ))}
          </select>

          {/* Department */}
          <select
            onChange={(e) => setDepartment(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option>Select Department</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleCreateUser}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow"
          >
            Create
          </button>
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50">

                <td className="p-3 font-medium">{u.name}</td>
                <td>{u.email}</td>

                {/* ROLE */}
                <td>
                  {editUser?._id === u._id ? (
                    <select
                      value={editUser.role}
                      onChange={(e) =>
                        setEditUser({ ...editUser, role: e.target.value })
                      }
                      className="border rounded px-2 py-1"
                    >
                      {roles.map((r) => (
                        <option key={r._id} value={r._id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-xs">
                      {u.role?.name}
                    </span>
                  )}
                </td>

                {/* DEPARTMENT */}
                <td>
                  {editUser?._id === u._id ? (
                    <select
                      value={editUser.department}
                      onChange={(e) =>
                        setEditUser({
                          ...editUser,
                          department: e.target.value,
                        })
                      }
                      className="border rounded px-2 py-1"
                    >
                      {departments.map((d) => (
                        <option key={d._id} value={d._id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
                      {u.department?.name || "N/A"}
                    </span>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="text-center space-x-2">

                  {/* Edit */}
                  {hasPermission(user, "edit_user") &&
                    (editUser?._id === u._id ? (
                      <button
                        onClick={handleUpdate}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-lg"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          setEditUser({
                            ...u,
                            role: u.role?._id,
                            department: u.department?._id,
                          })
                        }
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-lg"
                      >
                        Edit
                      </button>
                    ))}

                  {/* Delete */}
                  {hasPermission(user, "delete_user") && (
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>

    
  );
};

export default Users;