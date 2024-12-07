
import UserTable from "./UserTable";
import PostTable from "./PostTable";
import "./styles/AdminDashboard.scss";

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard__section">
        <h2>Manage Users</h2>
        <UserTable />
      </div>
      <div className="dashboard__section">
        <h2>Manage Posts</h2>
        <PostTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
