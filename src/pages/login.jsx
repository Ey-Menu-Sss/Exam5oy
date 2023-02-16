import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RegisterHeader from "../components/registerHeader";
import styles from "../styles/registerPage.module.scss";
import { useDispatch } from "react-redux";

const login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if(localStorage.getItem("token")){
    useEffect(()=>navigate("/dashboard"), [])
  }

  function onchange(e){
    setValues((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  }

  async function submit(e) {
    e.preventDefault();
    try {
      let data = await axios.post("/auth", {
        email: values.email,
        password: values.password,
      });
      console.log(data);
      if(data.data.token){
        toast("login success", {type: "success"})
        localStorage.setItem("token", data.data.token)
        // dispatch(UserDatas(data.data.))
        navigate("/dashboard")
      }
    } catch (err) {
      console.log(err);
      toast("Invalid Credentials", {type: "error"})
    }
  }

  return (
    <div>
      <RegisterHeader />

      <div className={styles.container}>
        <div className={styles.texts}>
          <h1>Sign In</h1>
          <br />
          <div className={styles.info}>
            <i className="bx bxs-user"></i>
            <h2>Sign Into Your Account</h2>
          </div>
        </div>
        <form className={styles.form} onSubmit={submit}>
          <input
            type="text"
            name="email"
            placeholder="Email Address"
            onChange={onchange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={onchange}
            required
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <br />
        <h4>
          Don't have an account?
          <Link to="/register" className={styles.link}>
            Sign Up
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default login;
