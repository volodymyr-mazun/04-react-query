
// ----------КОМПОНЕНТ, ДЛЯ HTTP ЗАПИТУ----------

import axios from "axios";
import type { Movie } from "../types/movie";

// ----------Базовий URL, токен доступу----------
const BASE_URL = "https://api.themoviedb.org/3";
const myKey = import.meta.env.VITE_TMDB_TOKEN;

export interface MoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export const fetchMovies = async ( query: string, page: number = 1): Promise<MoviesResponse> => {
    const response = await axios.get<MoviesResponse>(
        `${BASE_URL}/search/movie`,
            {
                params: { query, page,},
                headers: { Authorization: `Bearer ${myKey}`, },
            }
        );
    return response.data;
};