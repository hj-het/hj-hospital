import React, { useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { postRequest } from "../Api/api";
import "./../Auth/Login.css";

const Login = () => {
  const auth = useContext(AuthContext);
  const [contact, setContact] = useState(""); // Storing contact number
  const [password, setPassword] = useState(""); // Storing password
  const [loading, setLoading] = useState(false); // Loading state for the form
  const navigate = useNavigate(); // To navigate to the dashboard

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const payload = {
      Contact: contact,
      Password: password,
    };

    try {
      // Use the postRequest function to handle the API request
      const result = await postRequest("multilogin", payload);
      console.log("result-->",result)
      if (result.success) {
        toast.success(result.message || "Invalid login credentials");
        setLoading(false);
        navigate("/dashboard");
        return;
      }

      // Assuming the API response has a 'data' object with 'contact' and 'id'
      const { contact, id } = result.data;

      // Store the user data in localStorage
      localStorage.setItem("user", JSON.stringify({ username: contact, id }));

      // Set login data in context if necessary
      auth.login({ username: contact, id });

      toast.success("Login successful");
      setLoading(false);

      // Redirect to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Login failed: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />
      <div className="login-container">
        {/* Left Section with Image and Title */}
        <div className="login-left">
          <div className="image-grid">
            <img
              src="./images/main-photo.png"
              alt="Main"
              className="main-image"
            />
          </div>
        </div>

        {/* Right Section with Form */}
        <div className="login-right">
          {loading ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : (
            <form className="form-login" onSubmit={onSubmit}>
              <h1 className="heading">Sign In</h1>
              <input
                type="number"
                placeholder="Enter Contact Number"
                className={`input ${contact ? "" : "error"}`}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Link to="/forget-password">
                <p>Forget Password</p>
              </Link>
              <div className="login-button">
                <button
                  className="btn"
                  disabled={!contact || !password || loading}
                >
                  Login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
