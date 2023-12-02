import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { baseImageURL } from "../constants/constants";
import Loading from "./Loading";

const Hero = () => {
    const state = useSelector((store) => store);
    // console.log(state)
    const randomIndex = (Math.round(Math.random() * 19));

    // rendering random movie
    const randomMovie = !state.isMovieLoading && state.popularMovies[randomIndex];
    // console.log(randomMovie)

    return (
        <div className="row p-4">
            {/* Yüklenme devam ediyorsa veya rastgele film bulunmadıysa yükleniyor basar */}
            {state.isMovieLoading || !randomMovie ? (<Loading />) : (
                <>
                    <div className="col-md-6 d-flex flex-column gap-3 align-items-center justify-content-center">
                        <h1>{randomMovie.title}</h1>
                        <p className="text-start">{randomMovie.overview}</p>
                        <p>IMDB: <span className="text-warning">{randomMovie.vote_average.toFixed(1)}</span></p>
                        <div className="d-flex gap-3">
                            <Link className="btn btn-danger" to={"/detail"}>WATCH MOVIE</Link>
                            <Link className="btn btn-info" to={"#"}>ADD TO LIST</Link>
                        </div>
                    </div>
                    <div className="hero col-md-6">
                        <img className="img-fluid rounded shadow my-4" src={baseImageURL.concat(randomMovie.backdrop_path)} />
                    </div>
                </>
            )}
        </div>
    )
}

export default Hero