import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import "./common.css";
const DoctorSchedule = () => {
  return (
    <div>

      <div className="page-head">
        <h1>Doctor Schedule</h1>
        <div className="AddButton">
          <button className="btn-add">
            <IoIosAddCircleOutline /> Add Doctor Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule;
