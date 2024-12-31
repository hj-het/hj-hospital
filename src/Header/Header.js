import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import ReactModal from "react-modal";
import { FaUserDoctor, FaUser } from "react-icons/fa6";
import "./Header.css";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [hospitals, setHospitals] = useState([]); // For storing hospitals list

  const [formData, setFormData] = useState({
    doctor_name: "",
    doctor_image: "",
    gender: "Male",
    dob: "",
    contact_1: "",
    contact_2: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    email: "",
    specialist_in: "",
    hospital_id: "", 
  });
  const [loading, setLoading] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
 
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout(); // Assuming this clears auth tokens, etc.
    localStorage.clear();
    navigate('/'); // Redirect to login page
  };

const userData = JSON.parse(localStorage.getItem("user")) || {};
const role = userData.role || "Guest";
console.log("role -->", role);
  const login_id = userData?.id || null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(
          "https://hjhelthcare.kisskross.life/api/hospital"
        );
        const data = await response.json();


        if ( Array.isArray(data.data)) {
          console.log("Hospital Names:", data.data.map(hospital => hospital.hospital_name));
          setHospitals(data.data); 
        }
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };
  
    fetchHospitals();
  }, []);
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    const payload = {
      ...formData,
      login_id,
    };

    try {
      const response = await fetch(
        "https://hjhelthcare.kisskross.life/api/doctor/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Doctor added successfully!");
        setShowProfileModal(false);
      } else {
        alert("Failed to add doctor: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          {/* <input type="text" placeholder="Search" className="search-input" /> */}
        </div>

        <div className="header-right">
          <div className="profile-section" onClick={toggleDropdown}>
            <span className="username">Hello {role},</span>
            {role === "Doctor" ? (
              <FaUserDoctor className="profile-icon" />
            ) : (
              <FaUser className="profile-icon" />
            )}
          </div>


          {dropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <li >My Profile</li>
                <li onClick={handleLogout}>Logout</li>

              </ul>
            </div>
          )}
        </div>
      </header>

      <ReactModal
        isOpen={showProfileModal}
        onRequestClose={() => setShowProfileModal(false)}
        contentLabel="Profile Form Modal"
        className="modal-content-profile"
        overlayClassName="modal-overlay-profile"
        shouldCloseOnOverlayClick={false}
      >
         <button
      className="close-modal-btn"
      onClick={() => setShowProfileModal(false)}
    >
      &times;
    </button>
        <h3>My Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-main">
            <div className="form-part1">
              <div className="form-group">
                <label>Doctor Name</label>
                <input
                  type="text"
                  name="doctor_name"
                  value={formData.doctor_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Doctor Image URL</label>
                <input
                  type="text"
                  name="doctor_image"
                  value={formData.doctor_image}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact 1</label>
                <input
                  type="text"
                  name="contact_1"
                  value={formData.contact_1}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact 2</label>
                <input
                  type="text"
                  name="contact_2"
                  value={formData.contact_2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-part2">
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Specialist In</label>
                <input
                  type="text"
                  name="specialist_in"
                  value={formData.specialist_in}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Hospital</label>
                <select
                  name="hospital_id"
                  value={formData.hospital_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Hospital</option>
                  {hospitals.map((hospital) => (
                    <option key={hospital.id} value={hospital.id}>
                      {hospital.hospital_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </ReactModal>
    </>
  );
};

export default Header;
