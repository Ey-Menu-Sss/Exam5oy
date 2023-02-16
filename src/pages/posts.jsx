import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/dashboardHeader";
import { PostsLike, Allposts } from "../store/slices/user";
import styles from "../styles/dashboardPage.module.scss";

const posts = () => {
  const [postData, setPostData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postValue, setpostValue] = useState("");
  const [createpost, setCreatepost] = useState({});
  const [rlike , setRLike] = useState(true)
  const [rdislike , setRdisLike] = useState(true)

  if (!localStorage.getItem("token")) {
    useEffect(() => navigate("/login"), []);
  }

  useEffect(() => {
    (async function posts() {
      try {
        let data = await axios.get("/posts");
        axios.defaults.headers.common["x-auth-token"] =
        localStorage.getItem("token");
        setPostData(data.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [createpost, rlike, rdislike]);
  async function like(id) {
    try {
      let data = await axios.put(`/posts/like/${id}`);
      toast("Post liked!", { type: "success" });
      setRLike(data.data)
    } catch (err) {
      toast("Post already liked", { type: "error" });
    }
  }
  async function dislike(id) {
    try {
      let data = await axios.put(`/posts/unlike/${id}`);
      toast("Post unliked!", { type: "success" });
      setRdisLike(data.data)
    } catch (err) {
      toast("Post already unliked", { type: "error" });
    }
  }

  // message: onchange
  function onchange(e) {
    setpostValue(e.target.value);
  }

  // crete post
  async function createPost(e) {
    e.preventDefault();
    e.target.reset();
    let data = await axios.post("/posts", {
      text: postValue,
    });
    setCreatepost(data.data);
    console.log(data);
  }
  localStorage.setItem("myposts", JSON.stringify(createpost));

  // console.log(postData);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.texts}>
          <h1>Posts</h1>
          <div className={styles.info}>
            <i className="bx bxs-user"></i>
            <h2>Welcome to the community</h2>
          </div>
        </div>
        <br />
        <h2 className={styles.text_saysomething}>Say Something...</h2>
        <br />
        <form className={styles.form} onSubmit={createPost}>
          <textarea
            className={styles.textarea}
            name="text"
            id="text"
            cols="50"
            rows="4"
            onChange={onchange}
            placeholder="Create a post"
          ></textarea>
          <br />
          <br />
          <button className={styles.button} type="submit">
            Submit
          </button>
        </form>
        <br />

        {Object.keys(postData).length === 0 ? (
          <h1 style={{ textAlign: "center" }}>Just a second...</h1>
        ) : (
          postData.map((p, index) => (
            <div className={styles.userposts} key={index}>
              <Link to={`/profile/${p.user}`} className={styles.linktoprofile}>
                <div className={styles.img_name}>
                  <img src={p.avatar} alt="" />
                  <p>{p.name}</p>
                </div>
              </Link>

              <div className={styles.postnameandlikes}>
                <div className="post_name">
                  <h2>{p.text}</h2>
                </div>
                <br />
                <div className={styles.post_date}>Posted on {p.date}</div>
                <br />
                <br />
                <div className={styles.btns}>
                  <div className={styles.like} onClick={() => like(p._id)}>
                    <i className="bx bxs-like"></i>
                    <span>{p.likes.length}</span>
                  </div>
                  <div
                    className={styles.dislike}
                    onClick={() => dislike(p._id)}
                  >
                    <i className="bx bxs-dislike"></i>
                    <span></span>
                  </div>
                  <Link
                    to={`/posts/${p._id}`}
                    className={styles.linktodiscussion}
                  >
                    <div className={styles.discussion}>
                      Discussion{" "}
                      {p.comments?.length === 0 ? (
                        console.log()
                      ) : (
                        <span>{p.comments?.length}</span>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default posts;

{
  /* <div className={styles.removepost}>
<i className='bx bx-x' ></i>
</div> */
}
