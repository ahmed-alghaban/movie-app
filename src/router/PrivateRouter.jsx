import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { toastWarningNotify } from '../utils/toastNotify'

const PrivateRouter = ({ children }) => {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        toastWarningNotify('Please login to view this page');
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRouter
