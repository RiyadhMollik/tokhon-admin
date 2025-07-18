import { useState, useEffect } from "react";
import axios from "axios";

function RolePermission() {
  const [roles, setRoles ] = useState([]);
  const [ selectedRole, setSelectedRole ] = useState(null);
  const [ permissions, setPermissions ] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = "/api/roles";

  // Fetch roles data from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(API_URL);
        setRoles(response.data);
        if (response.data.length > 0) {
          setSelectedRole(response.data[0].id); // Default to the first role
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  // Fetch permissions for the selected role
  useEffect(() => {
    const fetchPermissions = async () => {
      if (!selectedRole) return;

      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/roles/${selectedRole}/permissions`);
        setPermissions(response.data);
      } catch (error) {
        console.error("Error fetching permissions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPermissions();
  }, [selectedRole]);

  console.log(permissions);

  // Toggle permission for a role
  const togglePermission = (permissionId) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((permission) =>
        permission.id === permissionId
          ? { ...permission, isGranted: !permission.isGranted }
          : permission
      )
    );
  };

  // Handle saving permissions to the API
  const handleSubmit = async () => {
    try {
      const updatedPermissions = permissions.map(({ id, isGranted }) => ({
        id,
        isGranted,
      }));
      await axios.put(`${API_URL}/roles/${selectedRole}/permissions`, {
        selectedRole,
        updatedPermissions,
      });
      alert("Permissions updated successfully!");
    } catch (error) {
      console.error("Error updating permissions:", error);
      alert("Failed to update permissions. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading permissions...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <div
        style={{
          flexGrow: 1,
          backgroundColor: "#f9fafb",
        }}
      >
        <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Set Role Permission</h1>
          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <div className="flex gap-2 items-center">
              <select
                id="role"
                value={selectedRole || ""}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">Set Permissions</h2>
            <div className="grid grid-cols-2 gap-4">
              {permissions.map((permission) => (
                <label key={permission.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={permission.isGranted}
                    onChange={() => togglePermission(permission.id)}
                    className="h-4 w-4 rounded border-gray-300 text-zinc-600"
                  />
                  <span>{permission.permission}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RolePermission;