

import PostTable from "../../components/Dashboard/PostTable";
import "../../components/Dashboard/styles/AdminDashboard.scss";
import SideNav from "../../components/navbar/SideNav";

const AdminDashboard = () => {
  return (
    <div>
      <SideNav/>
      <div className="dashboard">


<h1>Admin Dashboard</h1>
<div className="dashboard__section">
  <h2>Manage Users</h2>

</div>
<div className="dashboard__section">
  <h2>Manage Posts</h2>
<PostTable/>
</div>
</div>
    </div>
  );
};

export default AdminDashboard;
