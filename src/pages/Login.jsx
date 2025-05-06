import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeContext'
import { toastSuccessNotify, toastErrorNotify } from '../utils/toastNotify'
import './login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, signUpProvider, forgotPassword } = useContext(AuthContext);
    const { isDark } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn(email, password);
        if (result === true) {
            toastSuccessNotify('Logged in successfully!');
            navigate("/");
        } else {
            toastErrorNotify(result);
        }
    }

    const handleSignInProvider = async () => {
        const result = await signUpProvider();
        if (result === true) {
            toastSuccessNotify('Logged in with Google successfully!');
        } else {
            toastErrorNotify(result);
        }
    }

    const handleForgotPassword = async () => {
        if (!email) {
            toastErrorNotify('Please enter your email address');
            return;
        }
        const result = await forgotPassword(email);
        if (result === true) {
            toastSuccessNotify('Password reset email sent!');
        } else {
            toastErrorNotify(result);
        }
    }

    // Color palettes
    const bgColor = isDark ? 'bg-[##28292D]' : 'bg-[#f4f8f9]';
    const labelColor = isDark ? 'text-gray-200' : 'text-[#22223b]';
    const inputTextColor = isDark ? 'text-gray-100' : 'text-[#22223b]';
    const inputBorderColor = isDark ? 'border-[#e84545]' : 'border-[#e84545]';
    const inputFocusBorder = isDark ? 'focus:border-[#d7263d]' : 'focus:border-[#d7263d]';
    const linkColor = isDark ? 'text-gray-400' : 'text-[#6c757d]';
    const linkHover = 'hover:text-[#e84545]';
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
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4 px-8 py-10"
                        >
                            <h2 className="text-[#e84545] text-2xl font-bold text-center mb-4 tracking-[0.1em]">Sign In</h2>
                            <div className="relative z-0 w-full mb-6 group">
                                <input
                                    id="floating_email"
                                    name="floating_email"
                                    type="email"
                                    placeholder=" "
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={`peer bg-transparent border-0 border-b-2 ${inputBorderColor} ${inputFocusBorder} focus:outline-none ${inputTextColor} text-base px-0 py-2 w-full`}
                                />
                                <label
                                    htmlFor="floating_email"
                                    className={`absolute text-sm ${labelColor} duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-[#e84545] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                >
                                    Email
                                </label>
                            </div>
                            <div className="relative z-0 w-full mb-6 group">
                                <input
                                    id="floating_password"
                                    name="floating_password"
                                    type="password"
                                    placeholder=" "
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className={`peer bg-transparent border-0 border-b-2 ${inputBorderColor} ${inputFocusBorder} focus:outline-none ${inputTextColor} text-base px-0 py-2 w-full`}
                                />
                                <label
                                    htmlFor="floating_password"
                                    className={`absolute text-sm ${labelColor} duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-[#e84545] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                >
                                    Password
                                </label>
                            </div>
                            <div className={`flex justify-between text-sm mb-2 ${linkColor}`}>
                                <span className={`cursor-pointer ${linkHover}`} onClick={handleForgotPassword}>Forgot Password</span>
                                <Link to="/register" className={`cursor-pointer ${linkHover}`}>Sign Up</Link>
                            </div>
                            <button
                                type="submit"
                                className={`w-full ${btnBg} ${btnHover} ${btnText} font-bold py-2 rounded transition-colors duration-300 mb-2`}
                            >
                                Login
                            </button>
                            <button
                                type="button"
                                onClick={handleSignInProvider}
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

export default Login
