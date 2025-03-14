import React, { useEffect, useState } from "react";
import configService from "../api/config";
import { useSelector } from "react-redux";
import PostCard from '../Components/PostCard';
function UserPosts() {

  const [posts, setposts] = useState([]);
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    configService
      .getUserPosts(user.data._id)
      .then((res) => setposts(res.data))
      .catch((error) => console.log(error));
  }, []);
    if(posts.length > 0){
      return (<div className="w-full">
      
        <h1>Your Posts</h1>
        {posts.map((post)=>(
            <PostCard post={post} />
        ))}
      </div> )
    } else {
      return ( <h1>Post Not found</h1> )
    }
}

export default UserPosts;
