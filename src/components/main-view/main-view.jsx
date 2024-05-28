import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "The Shawshank Redemption",
            image: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
            director: "Frank Darabont"
        },
        {
            id: 2,
            title: "The Godfather",
            image: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
            director: "Francis Ford Coppola"
        },
        {
            id: 3,
            title: "The Godfather Part 2",
            image: "https://upload.wikimedia.org/wikipedia/en/0/03/Godfather_part_ii.jpg",
            director: "Francis Ford Coppola"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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