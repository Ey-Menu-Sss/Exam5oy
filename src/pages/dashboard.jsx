import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/dashboardPage.module.scss";
import Header from "../components/dashboardHeader";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Education, Experience, UserAllInfo } from "../store/slices/user";
import { toast } from "react-toastify";

const dashboard = () => {
  const [name, setName] = useState("");
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [use, setUse] = useState(false);
  const ud = useSelector((s) => s.userDatas.userdatas);
  const edu = useSelector((s) => s.userDatas.educations);
  console.log(profile);
  // let a = useSelector((i) => console.log(i))
  // console.log(ud.length);

  // console.log("locals", JSON.parse(localStorage.getItem("experiences")));

  if (!localStorage.getItem("token")) {
    useEffect(() => navigate("/login"), []);
  }

  useEffect(() => {
    (async function getprofileme() {
      axios.defaults.headers.common["x-auth-token"] = `${localStorage.getItem(
        "token"
      )}`;
      let res = await axios
        .get("/profile/me")
        .then((data) => {
          console.log(data);
          setName(data.data?.user?.name);
          setProfile(data.data);
          dispatch(UserAllInfo(data.data));
          setUse(true);
        })
        .catch((err) => {
          setUse(true);
          console.log(err);
        });
    })();
  }, []);

  function deleteExp(id) {
    try {
      let res = axios.delete(`/profile/experience/${id}`).then((data) => {
        console.log(data.data);
        dispatch(Experience(data.data.experience));
        toast("delted successfully", { type: "success" });
      });
    } catch (err) {
      console.log(err);
    }
  }
  function deleteEdu(id) {
    try {
      let res = axios.delete(`/profile/education/${id}`).then((data) => {
        dispatch(Education(data.data.education));
        toast("delted successfully", { type: "success" });
      });
    } catch (err) {
      console.log(err);
    }
  }

  function deleteAccaunt() {
    let ask = confirm("Are you sure? This can not be undone!");
    if (ask) {
      (async function delAcc() {
        let data = await axios.delete("/profile");
        toast(data.data.msg, {type: 'success'})
        localStorage.clear()
        navigate("/")
      })();
    }
  }

  return (
    <div>
      <Header />
      {/* tipa if */}

      {Object.keys(profile).length === 0 ? (
        <div className={styles.d_container}>
          <h1>Dashboard</h1>
          <br />
          {!use ? (
            <h1>Just a second...</h1>
          ) : (
            <div>
              <h2>
                <i className="bx bxs-user"></i>
                Hello and Welcome new User!
              </h2>
              <br />
              <p>You have not yet setup a profile, please add some info</p>
              <br />
              <br />
              <Link to="/create-profile" className={styles.button}>
                Create Profile
              </Link>
            </div>
          )}
        </div>
      ) : (
        // tipa else
        <div className={styles.d_container}>
          <h1>Dashboard</h1>
          <br />
          <h2>
            <i className="bx bxs-user"></i>
            Welcome {name}!
          </h2>
          <br />
          <div className={styles.addoredits}>
            <Link to="/edit-profile" className={styles.link}>
              <div className={styles.editProfile}>
                <i className="bx bxs-user-circle"></i>
                <p>Edit Profile</p>
              </div>
            </Link>
            <Link to="/add-experience" className={styles.link}>
              <div className={styles.addExperience}>
                <i className="bx bx-clipboard"></i>
                <p>Add Experience</p>
              </div>
            </Link>
            <Link to="/add-education" className={styles.link}>
              <div className={styles.addEducation}>
                <i className="bx bxs-graduation"></i>
                <p>Add Education</p>
              </div>
            </Link>
          </div>
          <br />
          <br />

          <div className={styles.expCredentials}>
            <h2>Experience Credentials</h2>
            <br />
            <table>
              <thead>
                <tr className={styles.thead}>
                  <th>Company</th>
                  <th>Title</th>
                  <th>Years</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {ud.length === 0
                  ? profile?.experience?.map((e, index) => (
                      <tr key={index} className={styles.tbody}>
                        <td>{e.company}</td>
                        <td>{e.title}</td>
                        <td>{e.from}</td>
                        <td>
                          <button onClick={() => deleteExp(e._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  : ud[0]?.map((u, index) => (
                      <tr key={index} className={styles.tbody}>
                        <td>{u.company}</td>
                        <td>{u.title}</td>
                        <td>{u.from}</td>
                        <td>
                          <button onClick={() => deleteExp(u._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <br />
          <br />

          {/* tepa Experiences    pas Educations */}

          <div className={styles.expCredentials}>
            <h2>Education Credentials</h2>
            <br />
            <table>
              <thead>
                <tr className={styles.thead}>
                  <th>School</th>
                  <th>Degree</th>
                  <th>Years</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {edu.length === 0
                  ? profile?.education?.map((e, index) => (
                      <tr key={index} className={styles.tbody}>
                        <td>{e.school}</td>
                        <td>{e.degree}</td>
                        <td>{e.from}</td>
                        <td>
                          <button onClick={() => deleteEdu(e._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  : edu[0]?.map((u, index) => (
                      <tr key={index} className={styles.tbody}>
                        <td>{u.school}</td>
                        <td>{u.degree}</td>
                        <td>{u.from}</td>
                        <td>
                          <button onClick={() => deleteEdu(u._id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
          <br />
          <br />

          <button className={styles.delete} onClick={deleteAccaunt}>
            Delete My Account
          </button>
        </div>
      )}
    </div>
  );
};

export default dashboard;
