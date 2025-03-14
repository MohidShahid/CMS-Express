import React, { useEffect, useState } from "react";
import configServiceInstance from "../api/config";
import PostCard from "../Components/PostCard"

function AllPosts() {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    configServiceInstance
      .getAllPosts()
      .then((res) => setposts(res.data))
      .catch((err) => console.log(err));
  });
  return <div className=""><h1 className="ml-5 mt-5">showing {posts.length} posts</h1>
  <div className="w-full flex flex-wrap items-center justify-center gap-3">
    {posts.map((post)=> 
    <PostCard post={post} key={post._id}/>
    )}
  </div>
  </div>;
}

export default AllPosts;
