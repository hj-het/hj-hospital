import React, { useEffect, useState } from "react";
import { FaUserNurse, FaUser, FaCalendarAlt, FaPhone, FaMapMarkerAlt, FaCity,FaPhoneAlt,FaAddressBook   } from "react-icons/fa";
import { TbBuildingEstate } from "react-icons/tb";
import { MdAddCircle } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableOne from "../Table/TableOne";
import "./../style/employee.css";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    Employee_Name: "",
    Employee_Gender: "",
    Employee_Image: "",
    Employee_Dob: "",
    Employee_DOJ: "",
    Employee_DOT: "",
    Employee_Contact_1: "",
    Employee_Contact_2: "",
    Employee_State: "",
    Employee_City: "",
    Employee_Pincode: "",
    Employee_Address: "",
    Employee_Email: "",
    Hospital_Id: "",
    Employee_Is_Active: true,
  });
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all employees
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        "https://hjhelthcare.kisskross.life/api/employee/getall"
      );
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      toast.error("Failed to fetch employees.");
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or Edit employee
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = isEditMode
      ? `https://hjhelthcare.kisskross.life/api/employee/update/${formData.id}`
      : "https://hjhelthcare.kisskross.life/api/employee/add";

    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(
          `Employee ${isEditMode ? "updated" : "added"} successfully!`
        );
        fetchEmployees();
        setShowModal(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Operation failed.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (employee) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${employee.Employee_Name}?`
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://hjhelthcare.kisskross.life/api/employee/delete/${employee.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Employee deleted successfully!");
        setEmployees((prev) => prev.filter((e) => e.id !== employee.id));
      } else {
        toast.error("Failed to delete employee.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  // Handle edit
  const handleEdit = (employee) => {
    setFormData(employee);
    setIsEditMode(true);
    setShowModal(true);
  };

  // Table columns
  const columns = [
    { Header: "Name", accessor: "Employee_Name" },
    { Header: "Gender", accessor: "Employee_Gender" },
    { Header: "Email", accessor: "Employee_Email" },
    { Header: "Contact 1", accessor: "Employee_Contact_1" },
    { Header: "DOB", accessor: "Employee_Dob" },
    { Header: "DOJ", accessor: "Employee_DOJ" },
    // { Header: 'Contact 2', accessor: 'Employee_Contact_2' },
    { Header: "State", accessor: "Employee_State" },
    { Header: "City", accessor: "Employee_City" },
    { Header: "Pincode", accessor: "Employee_Pincode" },
  ];

  return (
    <div>
      <ToastContainer />
      <div className="page-head">
        <h1>
          <FaUserNurse /> Staff
        </h1>
        <div className="AddButton">
          <button
            className="btn-add"
            onClick={() => {
              setShowModal(true);
              setIsEditMode(false);
              setFormData({
                Employee_Name: "",
                Employee_Gender: "",
                Employee_Image: "",
                Employee_Dob: "",
                Employee_DOJ: "",
                Employee_DOT: "",
                Employee_Contact_1: "",
                Employee_Contact_2: "",
                Employee_State: "",
                Employee_City: "",
                Employee_Pincode: "",
                Employee_Address: "",
                Employee_Email: "",
                Hospital_Id: "",
                Employee_Is_Active: true,
              });
            }}
          >
            <MdAddCircle /> Add Staff Details
          </button>
        </div>
      </div>

      <TableOne
        columns={columns}
        data={employees}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      {showModal && (
        <div className="modal">
          <div className="modal-content-employee">
            <h2>{isEditMode ? "Edit Staff" : "Add Staff"}</h2>
            <form onSubmit={handleSubmit}>
              <div  className="form-main">
              <div className="form-left">
                <div className="input-field">
                <FaUser className="input-icon" />
                  {/* <label>Name</label> */}
                  <input
                    type="text"
                    name="Employee_Name"
                    value={formData.Employee_Name}
                    onChange={handleInputChange}
                    placeholder="Employee_Name"
                    required
                  />
                </div>
                <div className="input-field">
                  {/* <label>Gender</label> */}
                <FaUser className="input-icon" />

                  <select
                    name="Employee_Gender"
                    value={formData.Employee_Gender}
                    onChange={handleInputChange}
                    placeholder="Employee_Gender"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="input-field">
                  {/* <label>DOB</label> */}
                  <FaCalendarAlt className="input-icon" />
                  <input
                    type="date"
                    name="Employee_Dob"
                    value={formData.Employee_Dob}
                    onChange={handleInputChange}
                    placeholder="Date Of Birth"
                    required
                  />
                </div>
                <div className="input-field">
                  {/* <label>DOJ</label> */}
                <FaCalendarAlt className="input-icon" />

                  <input
                    type="date"
                    name="Employee_DOJ"
                    value={formData.Employee_DOJ}
                    onChange={handleInputChange}
                    placeholder="Date OF Joining"
                    required
                  />
                </div>
                <div className="input-field">
                  {/* <label>Email </label> */}
                  <FaMapMarkerAlt className="input-icon" />
                  <input
                    type="text"
                    name="Employee_Email"
                    value={formData.Employee_Email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div className="form-right">
                <div className="input-field">
                <FaPhoneAlt className="input-icon" />
                  {/* <label>Contact 1</label> */}
                  <input
                    type="text"
                    name="Employee_Contact_1"
                    value={formData.Employee_Contact_1}
                    onChange={handleInputChange}
                    placeholder="Enter Contact "
                    required
                  />
                </div>
                <div className="input-field">
                  {/* <label>Address</label> */}
                  <FaAddressBook  className="input-icon" />
                  <input
                    type="text"
                    name="Employee_Address"
                    value={formData.Employee_Address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    required
                  />
                </div>
                <div className="input-field">
                  {/* <label>Pincode</label> */}
                  <FaPhone className="input-icon" />
                  <input
                    type="text"
                    name="Employee_Pincode"
                    value={formData.Employee_Pincode}
                    onChange={handleInputChange}
                    placeholder="Pincode"
                    required
                  />
                </div>
                <div className="input-field">
                  {/* <label>City</label> */}
                  <FaCity className="input-icon" />
                  <input
                    type="text"
                    name="Employee_City"
                    value={formData.Employee_City}
                    onChange={handleInputChange}
                    placeholder="Enter City"
                    required
                  />
                </div>
                <div className="input-field">
                  {/* <label>State</label> */}
                  <TbBuildingEstate className="input-icon" />
     
                  <input
                    type="text"
                    name="Employee_State"
                    value={formData.Employee_State}
                    onChange={handleInputChange}
                    placeholder="Enter State"
                    required
                  />
                </div>
              </div>    </div>
              <div className="employee-modal-button">
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
