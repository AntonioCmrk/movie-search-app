import { Route, Routes } from "react-router-dom";
import Error from "../components/Error";
import { Home } from "../pages/Home";
import { TrendingMovies } from "../pages/TrendingMovies";
import { TrendingPersons } from "../pages/TrendingPersons";
import { TopRatedMovies } from "../pages/TopRatedMovies";
import { Search } from "../pages/Search";
import { MovieDetails } from "../pages/MovieDetails";
import { ShowsDetails } from "../pages/ShowsDetails";
import { TopRatedShows } from "../pages/TopRatedShows";
import { PopularShows } from "../pages/PopularShows";
import { Playlists } from "../pages/Playlists";

const NavigationRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending-movies" element={<TrendingMovies />} />
        <Route path="/top-rated-movies" element={<TopRatedMovies />} />
        <Route path="/trending-shows" element={<PopularShows />} />
        <Route path="/top-rated-shows" element={<TopRatedShows />} />
        <Route path="/trending-persons" element={<TrendingPersons />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie-details" element={<MovieDetails />} />
        <Route path="/show-details" element={<ShowsDetails />} />
        <Route path="/playlists" element={<Playlists />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default NavigationRoutes;
