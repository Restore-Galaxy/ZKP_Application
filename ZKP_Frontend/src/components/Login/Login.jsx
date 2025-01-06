import React, { useState } from "react";
import emailIcon from "../img/email.svg";
import passwordIcon from "../img/password.svg";
import styles from "./SignUp.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "./toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({});

  const urlApi = "http://localhost:5000/login"; // Thay đổi thành API của bạn

  const chaeckData = async () => {
    try {
      const response = await axios.post(urlApi, {
        email: data.email,
        password: data.password,
      });
  
      if (response.data.ok) {
        notify("You login to your account successfully", "success");
        const verifyUrl = "http://localhost:5000/verify";
        const verifyResponse = await axios.post(verifyUrl, {
          email: data.email,
        });
        
        localStorage.setItem("token", verifyResponse.data.ok);
        console.log(verifyResponse.data.ok);

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        notify(response.data.message, "error");
      }
    } catch (error) {
      console.error(error);
      notify("Something went wrong!", "error");
    }
  };  

  const changeHandler = (event) => {
    if (event.target.name === "IsAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    chaeckData();
  };

  return (
    <div className={styles.container}>
      <form className={styles.formLogin} onSubmit={submitHandler} autoComplete="off">
        <h2>Sign In</h2>
        <div>
          <div>
            <input type="text" name="email" value={data.email} placeholder="E-mail" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={emailIcon} alt="" />
          </div>
        </div>
        <div>
          <div>
            <input type="password" name="password" value={data.password} placeholder="Password" onChange={changeHandler} onFocus={focusHandler} autoComplete="off" />
            <img src={passwordIcon} alt="" />
          </div>
        </div>

        <div>
          <button type="submit">Login</button>
          <span style={{ color: "#a29494", textAlign: "center", display: "inline-block", width: "100%" }}>
            Don't have a account? <Link to="/signup">Create account</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;