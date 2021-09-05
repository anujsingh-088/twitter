import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Post from "../feed/Post";
import "../feed/Feed.css";

const Posts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (!userId) {
      history.push("/login");
      return;
    }
    (async () => {
      const response = await axios.get("/api/posts/user_posts/" + userId);
      if (response?.data?.success) {
        setPosts(response?.data?.posts);
      }
    })();
  }, [history, userId]);

  const seePost = async (e) => {
    let postId = e.target?.dataset?.id;
    if (!postId) {
      const postContainerDiv = e.target?.closest(".post-container");
      if (postContainerDiv) postId = postContainerDiv?.dataset?.id;
    }
    if (postId) {
      history.push({ pathname: "/post", state: postId });
    }
  };
  return (
    <div className="posts-container" onClick={seePost}>
      {posts?.map((post, index) => (
        <Post
          key={index}
          username={post?.handle}
          title={post?.title}
          description={post?.description}
          id={post?._id}
        />
      ))}
    </div>
  );
};

export default Posts;
