import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    const { isDark } = useContext(ThemeContext);
    const { getImage, images } = useContext(MovieContext);

    useEffect(() => {
        getImage(movie.id);
    }, [movie.id, getImage]);

    // Determine rating tag color based on vote average
    const getRatingClass = (rating) => {
        if (rating >= 8) return 'tag green';
        if (rating >= 6) return 'tag orange';
        return 'tag red';
    };

    // Theme-based classes
    const cardBg = isDark ? 'bg-gray-900' : 'bg-white';
    const titleBar = 'flex items-center justify-between p-1 text-white bg-[#071036]';
    const overlayBg = 'movie-over absolute bottom-0 left-0 right-0 max-h-full overflow-auto p-4 transform translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0 bg-white/70 text-black';

    const imageUrl = images[movie.id]
        ? `https://image.tmdb.org/t/p/w500${images[movie.id]}`
        : movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/placeholder.jpg';

    return (
        <Link to={`/details/${movie.id}`} className="block w-[300px] h-[510px] m-4">
            <div className={`movie relative rounded-lg shadow-lg overflow-hidden group ${cardBg} w-full h-full`}>
                <div className="relative h-[450px] w-full">
                    <img
                        src={imageUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder.jpg';
                        }}
                    />
                </div>
                <div className={titleBar}>
                    <h5 className="p-3 truncate">{movie.title}</h5>
                    <span className={getRatingClass(movie.vote_average)}>{movie.vote_average?.toFixed(1)}</span>
                </div>
                <div className={overlayBg}>
                    <h2 className="text-center font-semibold">Overview</h2>
                    <p className="text-justify">{movie.overview}</p>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
