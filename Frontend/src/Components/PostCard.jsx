import React from 'react'
import { Link } from 'react-router-dom';
import { Card } from 'flowbite-react';

function PostCard({post}) {
  return (
    
    <Card className="max-w-sm">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
       {post.title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 max-h-[4.5rem] overflow-hidden text-ellipsis">
        {post.content}
      </p>
      <Link to={`/post/${post._id}`} className='flex items-center justify-start'>
        Read more
        <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </Card>
  );
}
export default PostCard;