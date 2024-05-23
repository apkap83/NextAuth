// pages/admin.js
import { getAdminData } from "@/(components)/AdminData";
import AdminDashboard from "@/(components)/AdminDashboard";

const AdminPage = async () => {
  const { usersList, rolesList, permissionsList } = await getAdminData();

  return (
    <AdminDashboard
      usersList={usersList}
      rolesList={rolesList}
      permissionsList={permissionsList}
    />
  );
};

export default AdminPage;
