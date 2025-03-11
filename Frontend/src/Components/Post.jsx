import React, { useEffect } from "react";
import configService from "../api/config";

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    configService
      .getSinglePost(id)
      .then((res) => setPost(res))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-3/4 flex flex-col items-start justify-center">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
    </div>
  );
}

export default Post;
