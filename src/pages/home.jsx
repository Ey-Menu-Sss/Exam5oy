import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterHeader from "../components/registerHeader";
import styles from "../styles/registerPage.module.scss";

const home = () => {
  const navigate =  useNavigate()

  if(localStorage.getItem("token")){
    useEffect(() => navigate("/dashboard"), [])
  }

  return (
    <div className={styles.home}>

      {/* header */}
      <RegisterHeader />

        {/* background img */}
      <div className={styles.opacityImg}>
        <div className={styles.img}></div>
      </div>


      {/* body */}
      <div className={styles.body}>
        <div className={styles.info}>
            <h1>Developer Connector</h1>
            <br />
            <p>Create a developer profile/portfolio, share posts and get help from other developers</p>
            <br />
            <div className={styles.btns}>
                <Link to="/register"><button className={styles.signup}>Sign Up</button></Link>
                <Link to="/login"><button className={styles.login}>Login</button></Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default home;
