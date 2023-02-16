import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/dashboardHeader";
import { Like } from "../store/slices/user";
import styles from "../styles/dashboardPage.module.scss";

const post = () => {
  const { id } = useParams();
  const [visibility, setDisplay] = useState("visible");
  const [postData, setPostData] = useState({});
  const dispatch = useDispatch();
  let plike = useSelector((s) => s.userDatas.like);
  const [comments, setComments] = useState([]);
  const [tdiscussion, setTdiscussion] = useState({});
  const [postValue, setpostValue] = useState("");

  useEffect(() => {
    let res = axios.get(`/posts/${id}`).then((data) => {
      setPostData(data.data);
      console.log(data);
    });
  }, []);

  async function like() {
    try {
      let data = await axios.put(`/posts/like/${id}`);
      toast("Post liked!", { type: "success" });
      dispatch(Like(data.data));
    } catch (err) {
      toast("Post already liked", { type: "error" });
    }
  }
  async function dislike() {
    try {
      let data = await axios.put(`/posts/unlike/${id}`);
      dispatch(Like(data.data));
      toast("Post unliked!", { type: "success" });
    } catch (err) {
      toast("Post already unliked", { type: "error" });
    }
  }
  // message: onchange
  function onchange(e) {
    setpostValue(e.target.value);
  }

  // crete post
  async function createDiscussion(e) {
    e.preventDefault();
    e.target.reset();
    let data = await axios.post(`/posts/comment${postData?._id}`, {
      text: postValue,
    });
    console.log(data);
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        {/* button backto posts */}
        <div className={styles.backtopostsDiv}>
          <Link to="/posts" className={styles.backtoposts}>
            Back to posts
          </Link>
        </div>

        {/* comments */}

        <div className={styles.userposts}>
          <Link
            to={`/profile/${postData.user}`}
            className={styles.linktoprofile}
          >
            <div className={styles.img_name}>
              <img src={postData.avatar} alt="" />
              <p>{postData.name}</p>
            </div>
          </Link>

          <div className={styles.postnameandlikes}>
            <div className="post_name">
              <h2>{postData.text}</h2>
            </div>
            <br />
            <div className={styles.post_date}>Posted on {postData.date}</div>
            <br />
            <br />
            <div className={styles.btns}>
              <div className={styles.like} onClick={like}>
                <i className="bx bxs-like"></i>
                {/* <span>{postData.likes?.length}</span> */}
                {plike.length === 0 ? (
                  <span>{postData.likes?.length}</span>
                ) : (
                  <span>{plike[0]?.length}</span>
                )}
              </div>
              <div className={styles.dislike} onClick={dislike}>
                <i className="bx bxs-dislike"></i>
                <span></span>
              </div>
              <Link
                to={`/posts/${postData._id}`}
                className={styles.linktodiscussion}
              >
                <div className={styles.discussion}>
                  Discussion{" "}
                  <span style={{ visibility: visibility }}>
                    {postData.comments?.length}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <br />
        <div className={styles.texts}>
          <h2 className={styles.text_saysomething}>Leave a Comment</h2>
          <br />
          <form className={styles.form} onSubmit={createDiscussion}>
            <textarea
              className={styles.textarea}
              name="text"
              id="text"
              cols="50"
              rows="4"
              onChange={onchange}
              placeholder="Comment the post"
            ></textarea>
            <br />
            <br />
            <button className={styles.button}>Submit</button>
          </form>
        </div>

        {/* comments */}

        {/* {Object.keys(tdiscussion).length !== 0 ? (
          // <div className={styles.userposts}>
          //   <Link to={`/profile/${tdiscussion.user}`} className={styles.linktoprofile}>
          //     <div className={styles.img_name}>
          //       <img src={tdiscussion.avatar} alt="" />
          //       <p>{tdiscussion.name}</p>
          //     </div>
          //   </Link>
          //   <div className={styles.postnameandlikes}>
          //     <div className="post_name">
          //       <h2>{tdiscussion.text}</h2>
          //     </div>
          //     <br />
          //     <div className={styles.post_date}>Posted on {tdiscussion.date}</div>
          //     <br />
          //     <button>delete</button>
          //   </div>
          // </div>
          
        ) : (
          console.log()
        )} */}

        {comments.map((c, index) => (
          <div className={styles.userposts} key={index}>
            <Link to={`/profile/${c.user}`} className={styles.linktoprofile}>
              <div className={styles.img_name}>
                <img src={c.avatar} alt="" />
                <p>{c.name}</p>
              </div>
            </Link>
            <div className={styles.postnameandlikes}>
              <div className="post_name">
                <h2>{c.text}</h2>
              </div>
              <br />
              <div className={styles.post_date}>Posted on {c.date}</div>
              <br />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default post;
