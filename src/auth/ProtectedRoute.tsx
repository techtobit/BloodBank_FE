import React from "react";
import { Navigate } from "react-router";



const ProtectedRoute = ({children}: {children:React.ReactNode}) => {
	const isAuthenticated = Boolean(localStorage.getItem('token'));
	return isAuthenticated ? <>{children}</> : <Navigate to='/login' />
}
export default ProtectedRoute;