import React from 'react'
import { useSelector } from 'react-redux'

function Front() {
  const user = useSelector((state) => state.auth);
  console.log(user);
  if(user.status === true){
     return <>Welcome {user.data.name}</>
  }
  else{
    return <>Welcome Guest - Login to see the posts</>
  }

}

export default Front