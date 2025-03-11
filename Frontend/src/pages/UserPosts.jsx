import React, { useEffect, useState } from "react";
import configService from "../api/config";
import { useSelector } from "react-redux";
import PostCard from '../Components/PostCard';
function UserPosts() {
  const selector = useSelector();
  const [posts, setposts] = useState([]);
  useEffect(() => {
    const user = selector((state) => state.auth);
    configService
      .getUserPosts(user.data._id)
      .then((res) => setposts(res))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="w-full">
      <h1>Your Posts</h1>
      {posts.map((post)=>{
         <PostCard post={post} />
      })}
    </div>
  );
}

export default UserPosts;
