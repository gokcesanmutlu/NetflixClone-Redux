import { useEffect } from "react"
import Hero from "../components/Hero"
import { useDispatch, useSelector } from "react-redux"
import { getGenres, getPopular } from './../redux/actions/movieActions';
import actionTypes from "../redux/actionTypes";
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";

const MainPage = () => {
  const dispatch = useDispatch()
  const state = useSelector((store) => store)

  useEffect(() => {
    dispatch({ type: actionTypes.SET_MOVIES_LOADING })
    // Get Popular Movies and store'a aktar
    dispatch(getPopular())

    dispatch({ type: actionTypes.SET_GENRES_LOADING })
    //türlerin verisini asenk. biçimde alıp reducer'a aktarıcak aksiyonu çalıştır
    dispatch(getGenres())
  }, [])
     // console.log(state)
  return (
    <div>
      {/* Welcoming Comp. */}
      <Hero />

      {/* Categories / 
      Her bir kategori için ekrana o kategorinin filmlerini basıcak bileşeni renderla
      Algorithm: önce yükleniyor mu kontrol et- yüklkeniyorsa loading bileşenini ekrana bas
      -yüklenme bittiyse hata var mı kontrol et- hata varsa ekrana hata mesajı bas-
      hata yoksa her bir kategori için ekrana o kategorinin filmlerini basıcak bileşeni bas*/}
      {state.isGenresLoading ? (<Loading />) :
        state.isGenresError ? (<p>Sorry, there is an error.</p>) : (state.genres.map((genre) => <MovieList genre={genre} key={genre.id} />))}
    </div>
  )
}

export default MainPage