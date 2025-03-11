import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthLayout({children , authentication = true}) {
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    if (authentication && !auth.status) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [auth.status, authentication, navigate]); // Dependencies

  // If authenticated or authentication check is not required, render children
  if (!authentication || auth.status) {
    return <>{children}</>;
  }

  // Otherwise, show nothing (or a loading spinner)
  return null;

}

export default AuthLayout