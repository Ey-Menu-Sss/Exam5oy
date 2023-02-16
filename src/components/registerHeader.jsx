import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../styles/registerPage.module.scss";

const registerHeader = () => {
  return (
    <div>
      <header id={styles.header}>
        <Link to="/" className={styles.logo}>
          <i className="bx bx-code-alt"></i>
          <h1>DevConnector</h1>
        </Link>
        <div className={styles.pages}>
          <Link to="/profiles" className={styles.links}>
            Developers
          </Link>
          <Link to="/register" className={styles.links}>
            Register
          </Link>
          <Link to="/login" className={styles.links}>
            Login
          </Link>
        </div>
      </header>
    </div>
  );
};

export default registerHeader;
