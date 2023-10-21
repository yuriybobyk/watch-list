import {axiosService} from "./axios.service";
import {baseURL} from "../constants";
import {IMovieData} from "../interfaces";
import {IMovieInfo} from "../interfaces";

class MovieService {
    searchMovies(query: string, page: number): Promise<IMovieData> {
        return axiosService.get(`${baseURL}/?s=${query}&apikey=186be766&page=${page}`)
    }

    getMovieInfo(imdbID: string): Promise<IMovieInfo> {
        return axiosService.get(`${baseURL}/?i=${imdbID}&apikey=186be766`)
    }
}

export const movieService = new MovieService()
