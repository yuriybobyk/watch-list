import {IMovie} from "./movie.interface";

export interface IMovieData{
    data: {
        Search: IMovie[];
        totalResults: string;
        Response: string;
    };
}
