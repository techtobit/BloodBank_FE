import React from "react";
import { useNavigate } from "react-router";

const ProtectedRoute = ({children}: {children:React.ReactNode}) => {
	const navigate= useNavigate()
	const isAuthenticated = Boolean(localStorage.getItem('token'));
	if (!isAuthenticated) {
    navigate('/login', {replace: true});
    return <></>; 
  }
	return  <>{children}</>;
}
export default ProtectedRoute;