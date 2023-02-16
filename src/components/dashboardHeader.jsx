import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../styles/dashboardPage.module.scss'

const dashboardHeader = () => {
    const navigate = useNavigate()
    function deleteToken() {
        localStorage.removeItem("token")
        useEffect(() => navigate("/login"))
    }
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
          <Link to="/posts" className={styles.links}>
            Posts
          </Link>
          <Link to="/dashboard" className={styles.links}>
          <i className="bx bxs-user"></i>
          Dashboard
          </Link>
          <Link to="/login" className={styles.links} onClick={deleteToken}>
          <i className='bx bx-log-in'></i>
          Logout
          </Link>
        </div>
      </header>
    </div>
  )
}

export default dashboardHeader
