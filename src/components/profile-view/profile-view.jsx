import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ movies }) => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    const favoriteMovies = movies.filter((m) => {
        return localUser.favoriteMovies.includes(m.id);
    });

    const [name, setName] = useState(localUser.Name||"");
    const [password, setPassword] = useState(localUser.Password||"");
    const [email, setEmail] = useState(localUser.Email||"");
    const [birthday, setBirthday] = useState(localUser.Birthday||"01/01/0001");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Name: name,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://logan-myflix-30a490a6c5c0.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };
    console.log(favoriteMovies);
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
                <Form.Label>
                    Username:
                </Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    minLength='4'
                />    
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>
                    Password:
                </Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>
                    Email:
                </Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formBirthday">
                <Form.Label>
                    Birthday:
                </Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">Edit Profile</Button>
            {
                localUser && favoriteMovies.map((movie) => (
                    <MovieCard movie={movie}></MovieCard>
                ))
            }
        </Form>
    );
};