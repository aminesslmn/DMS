import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/Dashboard/dashboard.tsx';
import AuthLayout from './layouts/Auth/authlayout.tsx';
import Login from './pages/Auth/LoginPage.jsx';
import RegisterPage from './pages/Auth/SigninPage.tsx';
import { PrivateRoute } from './pages/Auth/PrivateRoute.jsx';
import UserManagementTable from './pages/user/usersTable.jsx';
import { history } from './utils/history.js';
import { useNavigate, useLocation } from 'react-router-dom';
import NotFound from './pages/notfound.jsx';
import AddUserPage from './pages/user/addUser.jsx';
import DocumentUpload from './pages/docs/adddoc.jsx';
import Dashboard from './pages/dashboardpage.jsx';
import SettingsPage from './pages/settings.jsx';

function App() {
    history.navigate = useNavigate();
    history.location = useLocation();
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={
        <AuthLayout>
          <Login />
        </AuthLayout>
      } />
      <Route path="/register" element={
        <AuthLayout>
          <RegisterPage />
        </AuthLayout>
      } />
<Route path="*" element ={<NotFound/>} />
      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard/*" element={
          <DashboardLayout>
            <Dashboard/>
          </DashboardLayout>
        } />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/users" element={
          <DashboardLayout>
            <UserManagementTable/>
          </DashboardLayout>
        } />
        
      </Route>
      
      <Route element={<PrivateRoute />}>
        <Route path="/users/addUser" element={
          <DashboardLayout>
            <AddUserPage/>
          </DashboardLayout>
        } />
      </Route>
      
      <Route element={<PrivateRoute />}>
        <Route path="/docs" element={
          <DashboardLayout>
            <DocumentUpload/>
          </DashboardLayout>
        } />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/settings" element={
          <DashboardLayout>
            <SettingsPage/>
          </DashboardLayout>
        } />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={
          <DashboardLayout>
            <UserManagementTable/>
          </DashboardLayout>
        } />
      </Route>
    </Routes>
  );
}

export default App;
