import React from 'react'
import { useSelector } from 'react-redux'
import AllPosts from './AllPosts';

function Front() {
  const user = useSelector((state) => state.auth);

  if(user.status === true){
     return <div className="mt-12 pl-7"><h1 className='ml-5 text-2xl font-bold text-slate-700'>Welcome!  {user.data.name}</h1> 
      <AllPosts /></div>
  }
  else{
    return <div className='mt-12 pl-7 '> <h1 className='text-2xl font-bold text-slate-700'>Welcome Guest - Login to write content</h1>
    <AllPosts />
    </div>
  }

}

export default Front