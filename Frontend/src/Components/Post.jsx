import React, {useState , useEffect } from "react";
import configService from "../api/config";
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function Post() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [postOwner , setPostOwner] = useState(false);
  const user = useSelector((state)=> state.auth.data);

  const handleDeletePost = async(id)=>{
    try {
      await configService.deletePost(id);
      navigate('/');

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    configService
      .getSinglePost(id)
      .then((res) =>{ setPost(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
  
  // Watch for changes in post & user
  useEffect(() => {
    if (post.author && user?._id === post.author) {
      setPostOwner(true);
    } else {
      setPostOwner(false);
    }
  }, [post, user]); // Re-run when post or user changes

  return (
    <div className="w-4/5 min-w-72 flex items-start justify-center mt-12 min-h-screen" key={post._id}>
      <div className="w-3/4 flex flex-col items-start justify-center gap-8">
      <div className="flex items-center justify-between w-full">
        <h1 className="font-bold text-2xl">{post.title}</h1>
        {postOwner ? <div className="flex justify-center gap-2"><Button color="success">Edit</Button><Button color="failure" onClick={()=> handleDeletePost(post._id)}>Delete</Button></div> : ""}
        </div>
        <p>{post.content}</p>
      </div>
    </div>
  );
}

export default Post;
