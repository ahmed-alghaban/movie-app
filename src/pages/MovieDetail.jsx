import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import VideoSection from '../components/VideoSection'
import { MovieContext } from '../context/MovieContext'
import { ThemeContext } from '../context/ThemeContext'
import { AuthContext } from '../context/AuthContext'
import { toastWarningNotify } from '../utils/toastNotify'

const MovieDetail = () => {
    const { id } = useParams();
    const { movieDetails, videoKey, isLoadingDetails, getMovieDetails, clearMovieDetails } = useContext(MovieContext);
    const { isDark } = useContext(ThemeContext);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        if (id) {
            getMovieDetails(id);
        }
        return () => clearMovieDetails();
    }, [id, getMovieDetails, clearMovieDetails]);

    if (isLoadingDetails) {
        return <div className={`flex justify-center items-center h-screen ${isDark ? 'bg-gray-dark-main' : 'bg-white'}`}>Loading...</div>;
    }

    if (!movieDetails) {
        return <div className={`flex justify-center items-center h-screen ${isDark ? 'bg-gray-dark-main' : 'bg-white'}`}>Movie not found</div>;
    }

    // Theme-based classes
    const bgColor = isDark ? 'bg-gray-dark-main' : 'bg-white';
    const textColor = isDark ? 'text-slate-200' : 'text-gray-900';
    const cardBg = isDark ? 'bg-gray-700' : 'bg-gray-100';
    const listBg = isDark ? 'bg-gray-600' : 'bg-gray-100';
    const listText = isDark ? 'text-gray-200' : 'text-gray-900';
    const borderColor = isDark ? 'border-gray-500' : 'border-gray-400';

    return (
        <div className={`min-h-screen ${bgColor}`}>
            <div className="h-[55px]"></div>
            <div className="md:container px-10 mx-auto py-5">
                <h1 className={`text-center text-3xl ${textColor}`}>{movieDetails.title}</h1>

                {currentUser && videoKey ? (
                    <VideoSection videoKey={videoKey} title={movieDetails.title} />
                ) : videoKey && (
                    <div className="text-center mt-4">
                        <button
                            onClick={() => toastWarningNotify('Please login to watch the trailer')}
                            className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition duration-300 ease-in-out`}
                        >
                            Watch Trailer (Login Required)
                        </button>
                    </div>
                )}

                <div className="md:container flex justify-center px-10 mt-5">
                    <div className={`flex flex-col lg:flex-row w-2/3 rounded-lg shadow-lg ${cardBg}`}>
                        <img
                            className="lg:w-1/3 h-96 lg:h-[600px] object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
                            src={`https://image.tmdb.org/t/p/w1280${movieDetails.poster_path}`}
                            alt={movieDetails.title}
                        />
                        <div className="p-6 flex flex-col justify-between">
                            <div>
                                <h5 className={`text-xl font-medium mb-2 text-center ${textColor}`}>
                                    Overview
                                </h5>
                                <p className={`text-base mb-4 ${textColor}`}>
                                    {movieDetails.overview}
                                </p>
                            </div>
                            {currentUser ? (
                                <ul className={`rounded-lg ${listBg} ${borderColor} border`}>
                                    <li className={`flex justify-between px-6 py-2 border-b ${borderColor} w-full rounded-t-lg`}>
                                        <span className={`font-semibold ${listText}`}>Release Date</span>
                                        <span className={listText}>{movieDetails.release_date}</span>
                                    </li>
                                    <li className={`flex justify-between px-6 py-2 border-b ${borderColor} w-full`}>
                                        <span className={`font-semibold ${listText}`}>Rate</span>
                                        <span className={listText}>{movieDetails.vote_average}</span>
                                    </li>
                                    <li className={`flex justify-between px-6 py-2 border-b ${borderColor} w-full`}>
                                        <span className={`font-semibold ${listText}`}>Total Vote</span>
                                        <span className={listText}>{movieDetails.vote_count}</span>
                                    </li>
                                    <li className={`px-6 py-2 w-full rounded-b-lg text-center`}>
                                        <Link
                                            to="/"
                                            className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition duration-300 ease-in-out`}
                                        >
                                            Back
                                        </Link>
                                    </li>
                                </ul>
                            ) : (
                                <div className="text-center">
                                    <p className={`mb-4 ${textColor}`}>Please login to view movie details and ratings</p>
                                    <Link
                                        to="/login"
                                        className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition duration-300 ease-in-out`}
                                    >
                                        Login
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetail
