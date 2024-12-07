import  { useEffect, useState } from "react";
import { getUsers, deleteUser, updateUser } from "../../services/api";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/UserTable.scss";

toast.configure();

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedUser(null);
    setIsUpdateModalOpen(false);
  };

  const handleUpdate = async () => {
    try {
      await updateUser(selectedUser.id, selectedUser);
      toast.success("User updated successfully!");
      closeUpdateModal();
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update user.");
    }
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedUser(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(selectedUser.id);
      toast.success("User deleted successfully!");
      closeDeleteModal();
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div className="user-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>
                <Button variant="contained" color="primary" onClick={() => openUpdateModal(user)}>
                  Update
                </Button>
                <Button variant="contained" color="error" onClick={() => openDeleteModal(user)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      <Dialog open={isUpdateModalOpen} onClose={closeUpdateModal}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={selectedUser?.email || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, email: e.target.value })
            }
          />
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={selectedUser?.username || ""}
            onChange={(e) =>
              setSelectedUser({ ...selectedUser, username: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Save Changes
          </Button>
          <Button onClick={closeUpdateModal} variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onClose={closeDeleteModal}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this user?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} variant="contained" color="error">
            Yes, Delete
          </Button>
          <Button onClick={closeDeleteModal} variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserTable;
