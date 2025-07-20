import styles from "./App.module.css";

// ----------ІМПОРТ БІБЛІОТЕК----------
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginate from "react-paginate";

// ----------ІМПОРТ КОМПОНЕНТІВ----------
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import { fetchMovies } from "../../services/movieService";
import type { MoviesResponse } from "../../services/movieService";
import type { Movie } from "../../types/movie";

export default function App() {
  
// ----------стани----------
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isFetching, isError, isSuccess, error } = useQuery<
    MoviesResponse,
    Error,
    MoviesResponse,
    [string, string, number]
  >({
    queryKey: ["movies", query, page],           //ключі запиту
    queryFn: () => fetchMovies(query, page),     //функція запиту
    enabled: !!query,                            //залежний запит
    placeholderData: (prev) => prev,             //властивість, запобігання блимання
  });

  useEffect(() => {
    if (isSuccess && data?.results.length === 0) {
      toast("No movies found for your request.");
    }
  }, [isSuccess, data]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={styles.app}>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSearch} />

      {isLoading || isFetching ? <Loader /> : null}

      {isError && ( <ErrorMessage message={ error instanceof Error ? error.message : "Something went wrong" } /> )}

      {isSuccess && data?.results.length > 0 && (
        <>
          <MovieGrid movies={data.results} onSelect={handleSelectMovie} />

          {data.total_pages > 1 && (
            <ReactPaginate
              pageCount={data.total_pages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              containerClassName={styles.pagination}
              activeClassName={styles.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
      )}

      {selectedMovie && ( <MovieModal movie={selectedMovie} onClose={handleCloseModal} /> )}
    </div>
  );
};