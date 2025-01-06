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
        <h2>Rất tiếc, bạn không thể truy cập tính năng này</h2>
        <br/>
        <h2>Bạn là sinh viên Bách Khoa Hà Nội? Đăng nhập lại tại đây</h2>
        <button className={styles.button} onClick={() => {
          navigate("/login");
        }}>
          Đăng nhập
        </button>
      </div>
    </div>
  );
};

export default CheckStudentForm;
