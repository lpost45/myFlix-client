import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null)
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://logan-myflix-30a490a6c5c0.herokuapp.com/movies", {
            headers: { Authorization: 'Bearer ${token}' }
        })
            .then((response) => response.json())
            .then((data) => {
                // if (data.docs && Array.isArray(data.docs)) {
                    const moviesFromApi = data.map((doc) => {
                        return {
                            id: doc.key,
                            title: doc.Title,
                            director: doc.Director,
                            genre: doc.Genre,
                            image: doc.ImagePath,
                            description: doc.Description
                        };
                    });
                    setMovies(moviesFromApi);
                
                //}
                // else {
                //     console.error('Unexpected API response', data);
                // }
            });
    }, [token]);

    if (!user) {
        return (
        <>
            <LoginView onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
            }} />
            or
            <SignupView />
        </>
        );
    }

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
            {movies.map((movie) => (
                <MovieCard 
                    key={movie._id} 
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }} 
                />
            ))}
        </div>
    );
};