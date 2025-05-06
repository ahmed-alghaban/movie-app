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
                                className={`w-full ${btnBg} ${btnHover} ${btnText} font-bold py-2 rounded flex items-center justify-evenly transition-colors duration-300`}
                            >
                                <span>Continue with Google</span>
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    version="1.1"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 48 48"
                                    enableBackground="new 0 0 48 48"
                                    className="text-2xl ml-2"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
