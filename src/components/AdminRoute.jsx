import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../contexts/Store';

const AdminRoute = ({ children }) => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && userInfo.isAdmin ? children : <Navigate to="/logare" />;
};

export default AdminRoute;
