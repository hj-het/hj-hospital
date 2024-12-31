import React, { useState } from 'react';
import { FaUserNurse } from "react-icons/fa6";
import { MdAddCircle } from "react-icons/md";
import "./../style/employee.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./../style/employee.css";

const Employee = () => {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    Employee_Contact: '',
    Employee_Password: '',
    Employee_Added_By: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).id 
      : null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://hjhelthcare.kisskross.life/api/emp/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        toast.success('Employee added successfully!', { position: "top-right" });
        setShowModal(false);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        toast.error(`Error: ${errorData.message || 'Failed to add employee.'}`, { position: "top-right" });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.', { position: "top-right" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
        <ToastContainer />
      <div className="page-head">
        <h1><FaUserNurse /> Staff</h1>
        <div className="AddButton">
          <button className="btn-add" onClick={() => setShowModal(true)}>
            <MdAddCircle /> Add Staff
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="Employee_Contact">Contact</label>
                <input
                  type="text"
                  id="Employee_Contact"
                  name="Employee_Contact"
                  value={formData.Employee_Contact}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="Employee_Password">Password</label>
                <input
                  type="password"
                  id="Employee_Password"
                  name="Employee_Password"
                  value={formData.Employee_Password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn-submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Add Employee'}
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
