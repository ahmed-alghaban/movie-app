import React, { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import Switch from './Switch';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { isDark } = useContext(ThemeContext);
    const { currentUser, logOut } = useContext(AuthContext);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = async () => {
        await logOut();
        setIsProfileOpen(false);
    };

    return (
        <nav className={`${isDark ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <Link to="/">
                                <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>React Movie App</h1>
                            </Link>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <Switch />
                        <div className="relative ml-3">
                            <button
                                type="button"
                                className={`flex rounded-full ${isDark ? 'bg-gray-800' : 'bg-white'} text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                            >
                                <span className="sr-only">Open user menu</span>
                                <div className={`h-8 w-8 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                                    {currentUser?.photoURL ? (
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={currentUser.photoURL}
                                            alt=""
                                        />
                                    ) : (
                                        <span className={`${isDark ? 'text-white' : 'text-gray-800'}`}>
                                            {currentUser?.displayName?.[0] || '?'}
                                        </span>
                                    )}
                                </div>
                            </button>
                            {isProfileOpen && (
                                <div className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                                    {currentUser ? (
                                        <>
                                            <div className={`block px-4 py-2 text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                                                {currentUser.displayName || currentUser.email}
                                            </div>
                                            <button
                                                onClick={handleLogout}
                                                className={`block w-full text-left px-4 py-2 text-sm ${isDark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className={`block px-4 py-2 text-sm ${isDark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to="/register"
                                                className={`block px-4 py-2 text-sm ${isDark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
