import { useParams } from "react-router"
import { Link } from "react-router-dom";

export const MovieView = ({ movie }) => {
    const { movieId } = useParams();

    const movie = movie.find((m) => m._id === movieId);
    
    return (
        <div>
            <div>
                <img className="w-100" src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director.Name}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre.Name}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <Link to={'/'}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};