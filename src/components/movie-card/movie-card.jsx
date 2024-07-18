import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"

export const MovieCard = ({ movie }) => {
    console.log(movie)
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const addFav = () => {
        fetch(`https://logan-myflix-30a490a6c5c0.herokuapp.com/users/${user.Name}/movies/${movie.id}`, {
            "method": "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then((response) => response.json())
        .then(movie => {
            alert("Movie added")
        })
        .catch(e => console.log(e))
    }
    const removeFav = () => {
        fetch(`https://logan-myflix-30a490a6c5c0.herokuapp.com/users/${user.Name}/movies/${movie.id}`, {
            "method": "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then(movie => {
                alert("Movie deleted")
            })
            .catch(e => console.log(e))
    }
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director.Name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link">Open</Button>
                </Link>
                <Button onClick={addFav}>
                    Add to Favorites
                </Button>
                <Button onClick={removeFav}>
                    Remove from Favorites
                </Button>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string,
            Death: PropTypes.string
        }),
        genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        featured: PropTypes.bool
    }).isRequired,
};