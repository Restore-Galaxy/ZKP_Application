import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CheckStudentForm.module.css";

const CheckStudentForm = () => {
  const [studentId, setStudentId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validStudentId = "20219999";

    if (studentId === validStudentId) {
      navigate("/event");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2>Bạn có phải sinh viên Bách Khoa Hà Nội không?</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="studentId">Nhập MSSV của bạn:</label>
          <input
            type="text"
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CheckStudentForm;
