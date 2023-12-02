import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainPage from "./pages/MainPage"
import DetailPage from "./pages/DetailPage"
import Header from "./components/Header"

const App = () => {
  return <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="*" element={<h1>We didn't found that path.</h1>} />
    </Routes>
  </BrowserRouter>

}

export default App



          