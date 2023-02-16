import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/dashboardHeader";
import { Education } from "../store/slices/user";
import styles from "../styles/dashboardPage.module.scss";

const addEducation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    sob: "",
    doc: "",
    fos: "",
    date: "",
    progdesc: "",
  });

  //   form on submit
  async function submit(e) {
    e.preventDefault();
    try {
      let res = axios
        .put("/profile/education", {
          school: values.sob,
          degree: values.doc,
          fieldofstudy: values.fos,
          from: values.date,
        })
        .then((data) => {
          dispatch(Education(data.data?.education));
          navigate("/dashboard");
        })
        .catch((err) => {
          err?.response?.data?.errors.map((e) => {
            toast(e.msg, { type: "error" });
          });
        });
    } catch (err) {
      console.log(err);
    }
  }

  //   input values onchange
  function onchange(e) {
    setValues((old) => ({
      ...old,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div>
      <Header />
      <div className={styles.cp_container}>
        {/* texts tipa logo */}
        <div className={styles.texts}>
          <h1>Add An Education</h1>
          <br />
          <div>
            <i className="bx bx-git-branch"></i>
            Add any school or bootcamp that you have attended
          </div>
          <br />
          <p>* = required field</p>
        </div>

        {/* Form */}
        <form onSubmit={submit}>
          {/* inputs akkaunt informations*/}
          <section id={styles.inputs}>
            <input
              type="text"
              placeholder="* School or Bootcamp"
              name="sob"
              onChange={onchange}
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="* Degree or Certificate"
              name="doc"
              onChange={onchange}
            />
            <br />
            <br />
            <input
              type="text"
              placeholder="Field of Study"
              name="fos"
              onChange={onchange}
            />
            <br />
            <br />
            <h3>From Date</h3>
            <input type="date" name="date" onChange={onchange} />
            <br />
            <div className={styles.checkbox}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Curren School</span>
            </div>
            <br />
            <h3>To Date</h3>
            <input type="date" name="current date" onChange={onchange} />
            <br />
            <br />
            <textarea
              cols="30"
              rows="4"
              name="progdesc"
              onChange={onchange}
              placeholder="Program Description"
            ></textarea>
          </section>

          {/* buttons submit and go back */}
          <div className={styles.btns_submitandgoback}>
            <button className={styles.submit} type="submit">
              Submit
            </button>
            <Link to="/dashboard" className={styles.link}>
              Go Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default addEducation;
