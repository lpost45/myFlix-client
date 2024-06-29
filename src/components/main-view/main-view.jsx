import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

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

    return (
        <Row >
            {!user ? (
                <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                    }} />
                    or
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8}>
                    <MovieView 
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                <>
                    <Button variant="primary" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
                    {movies.map((movie) => (
                        <Col className="mb-5" key={movie._id} md={3}>
                            <MovieCard  
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }} 
                            />
                        </Col>
                    ))}
                </>
            )}
        </Row>
    );
};