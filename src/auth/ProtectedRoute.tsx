import React from "react";
import { useNavigate } from "react-router";

const ProtectedRoute = ({children}: {children:React.ReactNode}) => {
	const navigate= useNavigate()
	const isAuthenticated = Boolean(localStorage.getItem('token'));
	return isAuthenticated ? <>{children}</> : navigate('/login', {replace: true});
}
export default ProtectedRoute;