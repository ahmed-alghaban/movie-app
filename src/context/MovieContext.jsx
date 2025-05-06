import axios from "axios";
import { createContext, useEffect, useState, useCallback } from "react";

export const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [images, setImages] = useState({});
    const [movieDetails, setMovieDetails] = useState(null);
    const [videoKey, setVideoKey] = useState(null);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const apiKey = import.meta.env.VITE_apiKey;

    const getImage = useCallback(async (id) => {
        try {
            const res = await axios.get(`${baseUrl}/movie/${id}?api_key=${apiKey}`);
            setImages(prev => ({
                ...prev,
                [id]: res.data.poster_path
            }));
        }
        catch (error) {
            setError(error);
            console.error('Error fetching movie image:', error);
        }
    }, [baseUrl, apiKey]);

    const getMovies = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`);
            setMovies(response.data.results);
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }, [baseUrl, apiKey]);

    const searchMovies = useCallback(async (query) => {
        try {
            setLoading(true);
            const response = await axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`);
            setMovies(response.data.results);
        } catch (error) {
            setError(error.message);
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }, [baseUrl, apiKey]);

    const getMovieDetails = useCallback(async (id) => {
        try {
            setIsLoadingDetails(true);
            console.log('Fetching details for movie ID:', id);

            const [movieResponse, videoResponse] = await Promise.all([
                axios.get(`${baseUrl}/movie/${id}?api_key=${apiKey}`),
                axios.get(`${baseUrl}/movie/${id}/videos?api_key=${apiKey}`)
            ]);

            console.log('Video response:', videoResponse.data);

            setMovieDetails(movieResponse.data);

            // Find a YouTube trailer
            const trailer = videoResponse.data.results.find(video =>
                video.type === 'Trailer' &&
                video.site === 'YouTube'
            );
            setVideoKey(trailer.key)

            console.log('Found trailer:', trailer);

            
        } catch (error) {
            setError(error.message);
            console.error('Error fetching movie details:', error);
        } finally {
            setIsLoadingDetails(false);
        }
    }, [baseUrl, apiKey]);

    const clearMovieDetails = useCallback(() => {
        setMovieDetails(null);
        setVideoKey(null);
        setIsLoadingDetails(false);
    }, []);

    useEffect(() => {
        getMovies();
    }, [getMovies]);

    return (
        <MovieContext.Provider value={{
            movies,
            loading,
            isLoadingDetails,
            error,
            images,
            movieDetails,
            videoKey,
            getImage,
            searchMovies,
            getMovieDetails,
            clearMovieDetails,
        }}>
            {children}
        </MovieContext.Provider>
    )
}