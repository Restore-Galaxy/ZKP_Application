import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/Login/Signup";
import Login from "./components/Login/Login";
import HomePage from "./components/Home/HomePage";
import EventPage from "./components/Event/EventPage";
import Layout from "./components/Layout/Layout";
import CheckStudentForm from "./components/CheckForm/CheckStudentForm";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS của react-toastify

function App() {
  return (
    <Router>
      <ToastContainer /> {/* Đặt ToastContainer ở đây để toàn bộ ứng dụng đều sử dụng được */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Layout><HomePage /></Layout>} />
        <Route path="/event" element={<Layout><EventPage /></Layout>} />
        <Route path="/check-student" element={<CheckStudentForm />} />
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
}

export default App;
