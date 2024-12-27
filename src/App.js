
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { AuthProvider } from './Context/AuthContext';
// import ProtectedRoute from './ProtectedRoute';
import ProtectedRoute from './Context/ProtectedRoute';
import Login from './Auth/Login';
// import { AuthContext } from './Context/AuthProvider';
import Hospital from './Pages/Hospital';
import Doctor from './Pages/Doctor';
import Employee from './Pages/Employee';
import DoctorSchedule from './Pages/DoctorSchedule';
import Report from './Pages/Report';
import ForgetPassword from './Auth/ForgetPassword';
import Dashboard from './Pages/Dashboard';

function App() {
    return (
        // <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Route */}
                    <Route path="/" element={<Login />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                     
                    {/* Protected Routes */}
                    <Route 
                        path="/hospital" 
                        element={
                            <ProtectedRoute allowedRoles={['superAdmin', 'admin']}>
                                <Hospital />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/doctor" 
                        element={
                            <ProtectedRoute allowedRoles={['superAdmin', 'admin', 'doctor']}>
                                <Doctor />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/employee" 
                        element={
                            <ProtectedRoute allowedRoles={['superAdmin', 'admin', 'employee']}>
                                <Employee />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/doctor-schedule" 
                        element={
                            <ProtectedRoute allowedRoles={['superAdmin', 'admin', 'doctor']}>
                                <DoctorSchedule />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="/report" 
                        element={
                            <ProtectedRoute allowedRoles={['superAdmin', 'admin']}>
                                <Report />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </Router>
        // </AuthProvider>
    );
}

export default App;
