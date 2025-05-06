import React, { useContext, useState } from 'react'
import { MovieContext } from '../context/MovieContext'
import { ThemeContext } from '../context/ThemeContext'
import { AuthContext } from '../context/AuthContext'
import MovieCard from '../components/MovieCard'
import { Link } from 'react-router-dom'
import { toastWarningNotify } from '../utils/toastNotify'

const Home = () => {
    const { movies, searchMovies, loading } = useContext(MovieContext);
    const { isDark } = useContext(ThemeContext);
    const { currentUser } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (!currentUser) {
            toastWarningNotify('Please login to search for movies');
            return;
        }
        if (searchQuery.trim()) {
            searchMovies(searchQuery);
        }
    };

    return (
        <div className={`min-h-screen ${isDark ? 'bg-gray-dark-main' : 'bg-white'}`}>
            <div className="h-[55px]" />
            <form onSubmit={handleSearch} className="flex justify-center p-2 my-5">
                <div className="relative">
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-80 h-11 mr-2 pl-10 pr-4 rounded-lg border ${isDark
                            ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                            } focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                        placeholder="Search movies..."
                    />
                    <svg
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <button type="submit" className="btn-danger-bordered">Search</button>
            </form>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className={`text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>Loading...</div>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-4 p-4">
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))
                    ) : (
                        <div className={`text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            No movies found. Try a different search term.
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Home
