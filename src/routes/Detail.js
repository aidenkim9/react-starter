import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
  };
  console.log(movie);
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {movie ? (
        <div>
          <img src={movie.small_cover_image} alt="" />
          <h1>{movie.title}</h1>
          <div>
            <nav>
              <ul>
                <li>
                  <span>Like count: {movie.like_count} </span>
                </li>
                <li>
                  <span>Rating: {movie.rating} </span>
                </li>
                <li>
                  <span>Year: {movie.year}</span>
                </li>
                <li>
                  <Link to="/">Home</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div>
            <h2>Description</h2>
            <p>{movie.description_full}</p>
          </div>
          <div>
            <h2>Genres</h2>
            <ul>
              {movie.genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Detail;
