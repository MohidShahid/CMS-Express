import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (authentication && !auth.status) {
      navigate('/login'); // Redirect to login if authentication is required and user is not logged in
    }
  }, [auth.status, authentication, navigate]);

  // ✅ If authentication is NOT required (authentication = false), render the page normally
  if (!authentication) {
    return <>{children}</>;
  }

  // ✅ If authentication is required but user is logged in, render the page
  if (auth.status) {
    return <>{children}</>;
  }

  // ✅ Otherwise, show nothing or a loader
  return null;
}

export default AuthLayout;
