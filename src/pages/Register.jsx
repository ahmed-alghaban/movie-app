import React, { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { AuthContext } from '../context/AuthContext'
import { toastSuccessNotify, toastErrorNotify, toastWarningNotify } from '../utils/toastNotify'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'

const Register = () => {
    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
    });
    const { registerUser, signUpProvider } = useContext(AuthContext);
    const { isDark } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (registerData.password !== registerData.password2) {
            toastWarningNotify('Passwords do not match!');
            return;
        }
        const result = await registerUser(registerData.email, registerData.password, registerData.firstName + ' ' + registerData.lastName);
        if (result === true) {
            toastSuccessNotify('Registered successfully!');
            navigate("/");
        } else {
            toastErrorNotify(result);
        }
    }

    const handleGoogleSignIn = async () => {
        const result = await signUpProvider();
        if (result === true) {
            toastSuccessNotify('Signed in with Google successfully!');
            navigate("/");
        } else {
            toastErrorNotify(result);
        }
    }

    const bgColor = isDark ? 'bg-[#28292D]' : 'bg-[#f4f8f9]';
    const labelColor = isDark ? 'text-gray-200' : 'text-[#22223b]';
    const inputTextColor = isDark ? 'text-gray-100' : 'text-[#22223b]';
    const inputBorderColor = isDark ? 'border-[#e84545]' : 'border-[#e84545]';
    const inputFocusBorder = isDark ? 'focus:border-[#d7263d]' : 'focus:border-[#d7263d]';
    const btnBg = 'bg-[#e84545]';
    const btnHover = 'hover:bg-[#d7263d]';
    const btnText = 'text-white';
    const formBorder = isDark ? 'border-4 border-[#232323]' : 'border-4 border-white';

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-dark-main' : 'bg-[#f8fafc]'}`}>
            <div className="h-[55px]"></div>
            <div className={`flex-1 h-screen flex justify-center items-start ${isDark ? 'bg-gray-dark-main' : 'bg-[#f8fafc]'}`}>
                <div className="animate-border mt-[8vh] mx-auto w-[380px] rounded-[12px]">
                    <div className={`${bgColor} ${formBorder} rounded-[12px]`}>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-8 py-10">
                            <h2 className="text-[#e84545] text-2xl font-bold text-center mb-4 tracking-[0.1em]">Register</h2>
                            <div className="relative z-0 w-full mb-6 group">
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder=" "
                                    value={registerData.firstName}
                                    onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                                    required
                                    className={`peer bg-transparent border-0 border-b-2 ${inputBorderColor} ${inputFocusBorder} focus:outline-none ${inputTextColor} text-base px-0 py-2 w-full`}
                                />
                                <label
                                    htmlFor="firstName"
                                    className={`absolute text-sm ${labelColor} duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-[#e84545] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                >
                                    First Name
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder=" "
                                    value={registerData.lastName}
                                    onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                                    required
                                    className={`peer bg-transparent border-0 border-b-2 ${inputBorderColor} ${inputFocusBorder} focus:outline-none ${inputTextColor} text-base px-0 py-2 w-full`}
                                />
                                <label
                                    htmlFor="lastName"
                                    className={`absolute text-sm ${labelColor} duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-[#e84545] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                >
                                    Last Name
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder=" "
                                    value={registerData.email}
                                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                    required
                                    className={`peer bg-transparent border-0 border-b-2 ${inputBorderColor} ${inputFocusBorder} focus:outline-none ${inputTextColor} text-base px-0 py-2 w-full`}
                                />
                                <label
                                    htmlFor="email"
                                    className={`absolute text-sm ${labelColor} duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-[#e84545] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                >
                                    Email
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder=" "
                                    value={registerData.password}
                                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                    required
                                    className={`peer bg-transparent border-0 border-b-2 ${inputBorderColor} ${inputFocusBorder} focus:outline-none ${inputTextColor} text-base px-0 py-2 w-full`}
                                />
                                <label
                                    htmlFor="password"
                                    className={`absolute text-sm ${labelColor} duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-[#e84545] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                >
                                    Password
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input
                                    id="password2"
                                    name="password2"
                                    type="password"
                                    placeholder=" "
                                    value={registerData.password2}
                                    onChange={(e) => setRegisterData({ ...registerData, password2: e.target.value })}
                                    required
                                    className={`peer bg-transparent border-0 border-b-2 ${inputBorderColor} ${inputFocusBorder} focus:outline-none ${inputTextColor} text-base px-0 py-2 w-full`}
                                />
                                <label
                                    htmlFor="password2"
                                    className={`absolute text-sm ${labelColor} duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-[#e84545] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                >
                                    Confirm Password
                                </label>
                            </div>
                            <button type='submit' className={`w-full ${btnBg} ${btnHover} ${btnText} font-bold py-2 rounded transition-colors duration-300 mt-2`}>Register</button>

                            <div className="relative flex items-center justify-center mt-4">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="flex-shrink mx-4 text-gray-500">or</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="w-full bg-white text-gray-700 border border-gray-300 font-bold py-2 rounded transition-colors duration-300 hover:bg-gray-50 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Continue with Google
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
