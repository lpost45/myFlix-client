import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view.jsx";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null)
    const [movies, setMovies] = useState([]);
    const [searchMovie, setSearchMovie] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);

    const handleInputChange = (e) =>{
        const searchTerm = e.target.value;
        setSearchMovie(searchTerm);
    }

    const emptySearch = () => {
        setSearchMovie("");
    }

    useEffect(() => {
        if (searchMovie === "") {
            setFilteredMovies(movies)
        } else {
            const filteredList = movies.filter((movie) => {
                return movie.title.toLowerCase().includes(searchMovie.toLowerCase());
            });
            setFilteredMovies(filteredList);
        }
    }, [searchMovie, movies]);

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
                            id: doc._id,
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
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
                emptySearch={emptySearch}
                handleInputChange={handleInputChange}
                searchMovie={searchMovie}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user) => setUser(user)} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ): movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {filteredMovies.map((movie) => (
                                            <Col className="mb-4" key={movie._id} md={3}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                <ProfileView movies={filteredMovies} />
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};