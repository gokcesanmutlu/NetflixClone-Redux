import axios from "axios"
import { useEffect, useState } from "react"
import { baseImageURL, options } from './../constants/constants';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from "react-router-dom";

const MovieList = ({ genre }) => {
    const [movies, setMovies] = useState(null)

    useEffect(() => {
        // her kategori için 20 tane film geldi 
        axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre.id}`, options)
            .then((res) => setMovies(res.data.results))
            .catch((err) => console.log(err))
    }, [])

    // console.log(movies)
    // bu bileşen kategorinin filmleri için istek atıcak ve filmleri listelicek
    return (
        <div className="p-4">
            <h2 className="mb-3">{genre.name}</h2>

            {/* slider alanı */}
            <Splide
                options={{
                    gap: "10px", // elemanlar arası boşluk
                    pagination: false,  //alttaki noktaları kaldırır
                    autoWidth: true
                }} // genişliklerine göre otomatik sığdırır
            >
                {/* her bir filmin resmi için ekrana bir splide slide basıp içine img koyuyoruz */}
                {movies?.map((movie) =>
                    <SplideSlide key={movie.id}>
                        <Link to={`/detail/${movie.id}`}>
                            <img className="movie" src={baseImageURL.concat(movie.poster_path)} />
                        </Link>
                    </SplideSlide>)}
            </Splide>
        </div>
    )
}

export default MovieList