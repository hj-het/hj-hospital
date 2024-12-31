import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthProvider"; 
// import ProtectedRoute from "./Context/ProtectedRoute";
import Login from "./Auth/Login";
import Hospital from "./Pages/Hospital";
import Doctor from "./Pages/Doctor";
import Employee from "./Pages/Employee";
import DoctorSchedule from "./Pages/DoctorSchedule";
import Report from "./Pages/Report";
import ForgetPassword from "./Auth/ForgetPassword";
import Dashboard from "./Pages/Dashboard";
import Layout from "./Sidebar/Layout";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Login />} />
                    <Route path="/forget-password" element={ <ForgetPassword />} />
                    <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                    <Route path="/hospital" element={<Layout><Hospital /></Layout>} />
                    <Route path="/doctor" element={<Layout><Doctor /></Layout>} />
                    <Route path="/satff" element={<Layout><Employee /></Layout>} />
                    <Route path="/doctor-schedule" element={<Layout><DoctorSchedule /></Layout>} />
                    <Route path="/report" element={<Layout><Report/></Layout>} />
 
                    {/* Protected Routes with Layout */}
                    {/* <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={["admin", "doctor"]}>
                                <Layout>
                                    <Dashboard />
                                </Layout>
                            </ProtectedRoute>
                        }
                    /> */}
                    {/* <Route
                        path="/hospital"
                        element={
                            <ProtectedRoute allowedRoles={["admin", "doctor"]}>
                                <Layout>
                                    <Hospital />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/doctor"
                        element={
                            <ProtectedRoute allowedRoles={["admin", "doctor"]}>
                                <Layout>
                                    <Doctor />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/employee"
                        element={
                            <ProtectedRoute allowedRoles={["admin", "employee"]}>
                                <Layout>
                                    <Employee />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/doctor-schedule"
                        element={
                            <ProtectedRoute allowedRoles={["admin", "doctor"]}>
                                <Layout>
                                    <DoctorSchedule />
                                </Layout>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/report"
                        element={
                            <ProtectedRoute allowedRoles={["admin", "doctor"]}>
                                <Layout>
                                    <Report />
                                </Layout>
                            </ProtectedRoute>
                        }
                    /> */}
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
