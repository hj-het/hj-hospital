import React, { useEffect, useState } from "react";
import TableOne from "../Table/TableOne";
import { getRequest, postRequest, putRequest, deleteRequest } from "../Api/api";
import { MdAddCircle } from "react-icons/md";
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./common.css";
import "./Hospital.css";

const Hospital = () => {
  const [hospitals, setHospitals] = useState([]);
  const [formData, setFormData] = useState({
    hospital_name: "",
    hospital_owner_name: "",
    hospital_address: "",
    hospital_logo: "",
    website: "",
    state: "",
    city: "",
    pincode: "",
    contact_1: "",
    contact_2: "",
    email: "",
    services: [],
    is_active: true,
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [serviceInput, setServiceInput] = useState("");

  // Fetch all hospitals
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await getRequest("hospital");
        setHospitals(data.data);
      } catch (error) {
        toast.error("Failed to fetch hospitals.");
      }
    };
    fetchHospitals();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle adding a service
  const handleAddService = () => {
    if (serviceInput.trim() && !formData.services.includes(serviceInput)) {
      setFormData({
        ...formData,
        services: [...formData.services, serviceInput.trim()],
      });
      setServiceInput("");
    }
  };

  // Handle removing a service
  const handleRemoveService = (service) => {
    setFormData({
      ...formData,
      services: formData.services.filter((s) => s !== service),
    });
  };

  // Handle form submission for Add/Edit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.id) {
        // Update hospital
        await putRequest(`hospital/${formData.id}`, formData);
        toast.success("Hospital updated successfully!");
      } else {
        // Add new hospital
        await postRequest("hospital", formData);
        toast.success("Hospital added successfully!");
      }

      // Refresh hospital list
      const updatedHospitals = await getRequest("hospital");
      setHospitals(updatedHospitals.data);
      setShowModal(false);
      setFormData({
        hospital_name: "",
        hospital_owner_name: "",
        hospital_address: "",
        hospital_logo: "",
        website: "",
        state: "",
        city: "",
        pincode: "",
        contact_1: "",
        contact_2: "",
        email: "",
        services: [],
        
      });
    } catch (error) {
      toast.error("Failed to save hospital. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async (hospital) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${hospital.hospital_name}?`
    );
    if (!confirmDelete) return;

    try {
      await deleteRequest(`hospital/${hospital.id}`);
      toast.success("Hospital deleted successfully!");
      setHospitals((prev) => prev.filter((h) => h.id !== hospital.id));
    } catch (error) {
      toast.error("Failed to delete hospital.");
    }
  };

  // Handle Edit
  const handleEdit = (hospital) => {
    setFormData({
      ...hospital,
      services: hospital.services || [],
    });
    setShowModal(true);
  };

  // Table columns
  const columns = [
    { Header: "ID", accessor: "id" },
    {
      Header: "Logo",
      accessor: "hospital_logo",
      Cell: ({ value }) => {
        const isValidUrl = value && value.startsWith("http");
        const fallbackUrl = "/images/logo.jpg";
        return (
          <img
            src={isValidUrl ? value : fallbackUrl}
            alt="Hospital Logo"
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
    { Header: "Name", accessor: "hospital_name" },
    { Header: "Contact", accessor: "contact_1" },
    { Header: "Email", accessor: "email" },
    {
      Header: "Address",
      accessor: (row) =>
        `${row.hospital_address}, ${row.city}, ${row.state}, ${row.pincode}`,
    },
    { Header: "Services", accessor: (row) => row.services.join(", ") },
    { Header: "Owner", accessor: "hospital_owner_name" },
    {
      Header: "Website",
      accessor: "website",
      Cell: ({ value }) => (
        value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "gray", textDecoration: "underline" }}
          >
            {value}
          </a>
        ) : (
          "N/A"
        )
      ),
    },
    
  ];

  return (
    <div>
      <ToastContainer />
      <div className="page-head">
        <h1>Hospitals</h1>
        <button className="btn-add" onClick={() => setShowModal(true)}>
          <MdAddCircle /> Add Hospital
        </button>
      </div>
      <TableOne
        columns={columns}
        data={hospitals}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Hospital Form Modal"
        className="modal-content-hospital"
        overlayClassName="modal-overlay"
        shouldCloseOnOverlayClick={true}
      >
        <button className="close-modal-btn-hospital" onClick={() => setShowModal(false)}>
          &times;
        </button>
        <h3>{formData.id ? "Edit Hospital" : "Add Hospital"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="main-hospital-form">
            <div className="form-hospital-left">
              <div className="form-group">
                <label>Hospital Name</label>
                <input
                  type="text"
                  name="hospital_name"
                  value={formData.hospital_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Owner Name</label>
                <input
                  type="text"
                  name="hospital_owner_name"
                  value={formData.hospital_owner_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Logo URL</label>
                <input
                  type="text"
                  name="hospital_logo"
                  value={formData.hospital_logo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Website</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="hospital_address"
                    value={formData.hospital_address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="form-hospital-right">
                
            
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
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Contact</label>
                <input
                  type="text"
                  name="contact_1"
                  value={formData.contact_1}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Services</label>
                <div className="services-container">
                  {formData.services.map((service, index) => (
                    <div key={index} className="service-item">
                      {service}
                      <button
                        type="button"
                        onClick={() => handleRemoveService(service)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  placeholder="Add service"
                />
                <button
                  type="button"
                  onClick={handleAddService}
                  disabled={!serviceInput.trim()}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Hospital;
