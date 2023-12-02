import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseImageURL, options } from "../constants/constants";
import Loading from "../components/Loading";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const DetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);

  useEffect(() => {
    // getting movie-detail   // sadece bu bileşende kullanacağımız için state ile tutuyoruz
    axios
      .get(`/movie/${id}?language=en-US`, options)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err));

    //get cast
    axios
      .get(`/movie/${id}/credits`, options)
      .then((res) => setCast(res.data.cast))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="row">
      {!movie ? (
        <Loading />
      ) : (
        <>
          {/* üst alan */}
          <div className="col-12 banner">
            <img
              className="w-100 h-100 object-fit-cover"
              src={baseImageURL.concat(movie.backdrop_path)}
            />
            <div className="banner-bg">
              <span>{movie.title}</span>
            </div>
          </div>

          {/* cast */}
          <div className="col-12 mt-3 p-4">
            <h2 className="mb-3">Cast</h2>
            {/* slider alanı */}
            <Splide
              options={{
                height: "200px",
                gap: "10px", // elemanlar arası boşluk
                pagination: false, //alttaki noktaları kaldırır
                autoWidth: true,
              }} // genişliklerine göre otomatik sığdırır
            >
              {/* her bir oyuncu resmi için ekrana bir splide slide basıp içine img koyuyoruz */}
              {cast?.map((actor) => (
                <SplideSlide key={actor.cast_id}>
                  <div className="actor-card h-100">
                    <img
                      className="movie"
                      src={baseImageURL.concat(actor.profile_path)}
                    />
                   <p> <span>{actor.name}</span></p>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          </div>

          {/*left */}
          <div className="col-md-6 mt-4 p-4">
            {/* Companies */}
            <h3>Production Companies</h3>
            <div className="d-flex flex-wrap gap-4">
              {movie?.production_companies.map((comp) => (
                <div className="bg-white rounded p-2 d-flex align-items-center">
                  {comp.logo_path ? (
                    <img
                      className="object-fit-contain"
                      title={comp.name}
                      width={100}
                      height={50}
                      src={baseImageURL.concat(comp.logo_path)}
                    />
                  ) : (
                    <p
                      style={{ width: "100px", marginTop: "10px" }}
                      className="text-black text-center"
                    >
                      {comp.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {/* Languages */}
            <h3 className="mt-4">Languages</h3>
            <div className="d-flex flex-wrap gap-4">
              {movie?.spoken_languages.map((lang) => (
                <div className="bg-white rounded p-1 text-black">
                  <span>{lang.english_name}</span>
                </div>
              ))}
            </div>
            {/* Countries */}
            <h3 className="mt-4">Countries</h3>
            <div className="d-flex flex-wrap gap-4">
              {movie?.production_countries.map((country) => (
                <div className="bg-white rounded p-1 text-black">
                  <span>{country.name}</span>
                </div>
              ))}
            </div>
          </div>
          {/* right */}
          <div className="col-md-6 mt-4 p-4">
            <p className="lead">{movie.overview}</p>

            <p>
              <span className="fw-bold">Budget: </span>
              {movie.budget}
            </p>
            <p>
              <span className="fw-bold">Revenue: </span>
              {movie.revenue}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailPage;

// siyah katman eklemenin üç yolu var,
// 1 before after 1- yeni bir div açıp onu position absolute ile
// fotoğrafın üsüne koyma
