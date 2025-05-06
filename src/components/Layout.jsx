import React, { useContext } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Layout = () => {
    const { isDark } = useContext(ThemeContext);

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-dark-main' : 'bg-[#f8fafc]'}`}>
            <Navbar />
            <Outlet />
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={isDark ? "dark" : "light"}
            />
        </div>
    )
}

export default Layout
