import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://logan-myflix-30a490a6c5c0.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                if (data.docs && Array.isArray(data.docs)) {
                    const moviesFromApi = data.docs.map((doc) => {
                        return {
                            id: doc.key,
                            title: doc.title,
                            description: doc.description,
                            genre: doc.genre,
                            director: doc.director,
                            image: doc.image,
                            featured: doc.featured
                        };
                    });
                    setMovies(moviesFromApi);
                } else {
                    console.error('Unexpected API response', data);
                }
            });
    }, []);

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
            {movies.map((movie) => (
                <MovieCard 
                    key={movie.id} 
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }} 
                />
            ))}
        </div>
    );
};