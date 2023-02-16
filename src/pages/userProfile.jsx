import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/userProfile.module.scss";
import Header from "../components/dashboardHeader";
import axios from "axios";

const userProfile = () => {
  const { id } = useParams();
  const [proData, setProfileData] = useState([]);
  useEffect(() => {
    let res = axios.get(`/profile/user/${id}`).then((data) => {
      setProfileData(data.data);
      console.log(data);
    });
  }, []);

  console.log("prodata is:", proData);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Link to="/profiles" className={styles.back}>
          Back to Profiles
        </Link>
        <br />  
        {Object.keys(proData).length === 0 ? (
          <h1 style={{marginTop: "2rem"}}>Just a second...</h1>
        ) : (
          <div className="informations">
            <div className={styles.tipashowcase}>
              <img src={proData.user?.avatar} alt="" />
              <br />
              <div className={styles.name}>{proData.user?.name}</div>
              <br />
              <div className={styles.company}>
                {proData.status} {proData.company != "" ? <p>at</p> : <p></p>}{" "}
                {proData.company}
              </div>
              <div className={styles.socialLinks}>
                {proData.social?.facebook !== "" &&
                proData.social?.facebook !== null ? (
                  <a href={proData.social?.facebook} target="_blank">
                    <i className="bx bxl-facebook-circle"></i>
                  </a>
                ) : (
                  console.log("")
                )}
                {proData.social?.instagram !== "" &&
                proData.social?.instagram !== null ? (
                  <a href={proData.social?.instagram} target="_blank">
                    <i className="bx bxl-instagram-alt"></i>
                  </a>
                ) : (
                  console.log()
                )}
                {proData.social?.linkedin !== "" &&
                proData.social?.linkedin !== null ? (
                  <a href={proData.social?.linkedin} target="_blank">
                    <i className="bx bxl-linkedin-square"></i>
                  </a>
                ) : (
                  console.log("")
                )}
                {proData.social?.twitter !== "" &&
                proData.social?.twitter !== null ? (
                  <a href={proData.social?.twitter} target="_blank">
                    <i className="bx bxl-twitter"></i>
                  </a>
                ) : (
                  console.log("")
                )}
                {proData.social?.youtube !== "" &&
                proData.social?.youtube !== null ? (
                  <a href={proData.social?.youtube} target="_blank">
                    <i className="bx bxl-youtube"></i>
                  </a>
                ) : (
                  console.log("")
                )}
              </div>
            </div>
            <br />
            <div className={styles.bio_skills}>
              <div className={styles.bio}>
                <h2>{proData.user?.name}'s Bio</h2>
                <br />
                <p>{proData.bio}</p>
                <br />
              </div>
              <hr />
              <div className={styles.skills}>
                <br />
                <h2>Skill Set</h2>
                <br />
                <div className={styles.flexallskills}>
                  {proData.skills?.map((s, index) => (
                    <div className={styles.skill} key={index}>
                      <i className="bx bx-check"></i>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.expAndedu}>
              {proData.experience?.length === 0 ? (
                <div className={styles.experiense}>
                  <h3>Experiense</h3>
                  <h5>no experiences</h5>
                </div>
              ) : (
                proData.experience?.map((e, index) => (
                  <div className={styles.experiense} key={index}>
                    <h3>Experiense</h3>
                    <br />
                    <div className={styles.company}>
                      <h4>{e.company}</h4>
                    </div>
                    <div className={styles.date}>{e.from} - Now</div>
                    <div className={styles.postion}>
                      <h4>Position:</h4> {e.title}
                    </div>
                    <div className={styles.location}>
                      <h4>Location:</h4> {e.location}
                    </div>
                    <div className={styles.description}>
                      <h4>Description:</h4> {e.description}
                    </div>
                  </div>
                ))
              )}
              {proData.education?.length === 0 ? (
                <div className={styles.education}>
                  <h3>Education</h3>
                  <h5>no educations</h5>
                </div>
              ) : (
                proData.education?.map((e, index) => (
                  <div className={styles.education} key={index}>
                    <h3>Educations</h3>
                    <br />
                    <div className={styles.school}>
                      <h4>school:</h4>
                      {e.school}
                    </div>
                    <div className={styles.feilesofstudy}>
                      <h4>feiled of study:</h4>
                      {e.fieldofstudy}
                    </div>
                    <div className={styles.description}>
                      <h4>description:</h4>
                      {e.description}
                    </div>
                    <div className={styles.degree}>
                      <h4>degree:</h4>
                      {e.degree}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default userProfile;
