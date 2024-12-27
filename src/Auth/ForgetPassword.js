import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import './register.css'; // Custom CSS

const ForgetPassword = () => {
  const [contact, setContact] = useState("");  // For storing contact number
  const [password, setPassword] = useState("");  // For storing new password
  const [loading, setLoading] = useState(false);  // For loading state
  const navigate = useNavigate();

  const [activeImage, setActiveImage] = useState(0); // Image carousel state

  // Image list for carousel
  const images = [
    '/images/login-page-image-1.png',
    '/images/login-page-2.jpg',
    '/images/login-page-image-3.jpg',
    '/images/login-page-image-4.jpg',
  ];

  // Function to move to the next image
  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  // Function to move to the previous image
  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-play feature using useEffect
  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);  // Clear interval on component unmount
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Simple client-side validation
    if (!contact || !password) {
      alert("Please fill in all the fields.");
      return;
    }

    setLoading(true);

    // Create a payload to send to the API
    const payload = {
      Contact: contact,  // Send the contact number
      Password: password,  // Send the new password
    };

    try {
      const response = await fetch("https://your-api-endpoint.com/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Password reset successful!");
        navigate("/login");  // Redirect to Login page after successful password reset
      } else {
        alert(result.message || "Password reset failed.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during password reset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Left Section with Image Carousel */}
        <div className="register-left">
          <div className="image-grid">
            <img
         src='./images/main-photo.png'
              alt="Carousel Image"
              className="main-image"
            />
          </div>
        </div>

        {/* Right Section with Forgot Password Form */}
        <div className="register-right">
          {loading ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : (
            <form className="form-register" onSubmit={handleSubmit}>
              <h1 className="heading">Forgot Password</h1>

              <input
                type="tel"
                placeholder="Enter Contact Number"
                className={`input ${contact ? "" : "error"}`}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                maxLength={10}
              />
              <input
                type="password"
                placeholder="Enter New Password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="submit"
                className="btn"
                disabled={!contact || !password || loading}
              >
                Reset Password
              </button>
            </form>
          )}

          <p>
            Remembered your password? <Link to="/">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
