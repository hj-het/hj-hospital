import React, { useEffect, useState } from "react";
import TableOne from "../Table/TableOne";
import { getRequest, postRequest } from "../Api/api";
import { MdAddCircle } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import Modal from "react-modal";
import "./common.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../style/employee.css";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
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
    specialist_in: [],
    hospital_id: "",
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [specialtyInput, setSpecialtyInput] = useState("");
  const userData = JSON.parse(localStorage.getItem("user")) || {};
  const login_id = userData?.id || null;

  // Fetch hospitals and doctors data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const hospitalsData = await getRequest("hospital");
        const doctorsData = await getRequest("doctor/get-all");

        // Map hospital names to doctors
        const mappedDoctors = doctorsData.data.map((doctor) => {
          const hospital = hospitalsData.data.find(
            (h) => h.id === doctor.hospital_id
          );
          return {
            ...doctor,
            hospital_name: hospital ? hospital.hospital_name : "Unknown",
            address: `${doctor.doctor_address}, ${doctor.doctor_city}, ${doctor.doctor_state}`,
          };
        });

        setHospitals(hospitalsData.data);
        setDoctors(mappedDoctors);
      } catch (error) {
        toast.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = () => {
    console.log("edit");
  };

  const handleDelete = async (doctorId) => {
    if (!doctorId) {
      console.error("Doctor ID is undefined.");
      return;
    }
  
    const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(
        `https://hjhelthcare.kisskross.life/api/doctor/delete/${doctorId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const result = await response.json();
  
      if (response.ok) {
        toast.success("Doctor deleted successfully!");
        setDoctors((prevDoctors) => prevDoctors.filter((doc) => doc.id !== doctorId));
      } else {
        toast.error("Failed to delete doctor: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("An error occurred while trying to delete the doctor.");
    }
  };
  
  

  const handleSpecialtyAdd = () => {
    if (
      specialtyInput.trim() &&
      !formData.specialist_in.includes(specialtyInput)
    ) {
      setFormData({
        ...formData,
        specialist_in: [...formData.specialist_in, specialtyInput.trim()],
      });
      setSpecialtyInput("");
    }
  };

  const handleSpecialtyRemove = (specialty) => {
    setFormData({
      ...formData,
      specialist_in: formData.specialist_in.filter((s) => s !== specialty),
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      login_id,
    };

    try {
      const result = await postRequest("doctor/add", payload);
      console.log("result-->");
      if (result.ok) {
        toast.success("Doctor Added Successfully!");
        setShowProfileModal(false);
        const updatedDoctors = await getRequest("doctor/get-all");
        setDoctors(updatedDoctors.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        "An error occurred while submitting the form. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Define table columns
  const columns = [
    {
      Header: "Sr No.",
      accessor: (row, index) => index + 1,
      id: "index",
    },
    {
      Header: "Doctor Image",
      accessor: "doctor_image",
      Cell: ({ value }) => {
        const isValidUrl = value && value.startsWith("http");
        const fallbackUrl = "/images/doctor-defualt.png";
        return (
          <img
            src={isValidUrl ? value : fallbackUrl}
            alt="Doctor"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        );
      },
    },
    { Header: "Doctor Name", accessor: "doctor_name" },
    { Header: "Hospital Name", accessor: "hospital_name" },
    { Header: "Gender", accessor: "doctor_gender" },
    { Header: "Email", accessor: "doctor_email" },
    { Header: "Contact", accessor: "doctor_contact_1" },
    { Header: "Birth Date", accessor: "doctor_dob" },

    {
      Header: "Specialist In",
      accessor: (row) => row.doctor_specialist_in.join(", "),
    },
    { Header: "Address", accessor: "address" },
  ];

  return (
    <div>
      <ToastContainer />
      <div className="page-head">
        <h1>
          <FaUserDoctor /> Doctors
        </h1>
        <div className="AddButton">
          <button
            className="profile-button"
            // onClick={() => setShowProfileModal(true)}
          >
            <ImProfile />
            My-Profile
          </button>
          <button className="btn-add" onClick={() => setShowProfileModal(true)}>
            <MdAddCircle /> Add Doctor
          </button>
        </div>
      </div>
      <TableOne
        columns={columns}
        data={doctors}
        handleEdit={handleEdit}
        handleDelete={(doctor) => handleDelete(doctor.doctor_id)}
      />

      <Modal
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
        <h3>Add Doctor</h3>
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
                <div className="specialty-container">
                  {formData.specialist_in.map((specialty, index) => (
                    <div key={index} className="specialty-item">
                      {specialty}
                      <button
                        type="button"
                        onClick={() => handleSpecialtyRemove(specialty)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={specialtyInput}
                  onChange={(e) => setSpecialtyInput(e.target.value)}
                  placeholder="Add specialty"
                />
                <button
                  type="button"
                  onClick={handleSpecialtyAdd}
                  disabled={!specialtyInput.trim()}
                >
                  Add
                </button>
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
      </Modal>
    </div>
  );
};

export default Doctor;
