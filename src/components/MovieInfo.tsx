import React, {useEffect} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {useAppDispatch, useAppSelector} from "../hooks";
import {addToWantToWatch, addToWatched, movieActions, removeFromWantToWatch, removeFromWatched} from "../redux";
import {Button} from "@mui/material";

interface MovieDetailProps {
    imdbID: string;
    onClose: () => void;
}

const MovieInfo: React.FC<MovieDetailProps> = ({imdbID, onClose}) => {

    const {movieInfo} = useAppSelector(state => state.movieReducer);

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(movieActions.getMovieInfo(imdbID))
    }, [dispatch, imdbID]);

    const handleWatchedClick = () => {
        dispatch(addToWatched(imdbID));
        dispatch(removeFromWantToWatch(imdbID))
    };

    const handleWantToWatchClick = () => {
        dispatch(addToWantToWatch(imdbID))
        dispatch(removeFromWatched(imdbID))
    };

    return (
        <>
            <div className="flex flex-row py-5 px-5 justify-center border-b-4 -sky-500">
                {movieInfo ? (
                    <>
                        <img className="h-[350px] object-cover" src={movieInfo?.data.Poster}
                             alt={movieInfo?.data.Title}/>
                        <div className="flex flex-col m-5">
                       <span className="text-xl font-semibold text-black my-3.5 mx-0 truncate capitalize">
                            {movieInfo?.data.Type}: <span className="opacity-80">{movieInfo?.data.Title}</span>
                       </span>
                            <span className="movieInfo">
                            IMDB Rating: <span className="spanOpacity">{movieInfo?.data.imdbRating}</span>
                        </span>
                            <span className="movieInfo">
                            Year: <span className="spanOpacity">{movieInfo?.data.Year}</span>
                        </span>
                            <span className="movieInfo">
                            Language: <span className="spanOpacity">{movieInfo?.data.Language}</span>
                        </span>
                            <span className="movieInfo">
                            Rated: <span className="spanOpacity">{movieInfo?.data.Rated}</span>
                        </span>
                            <span className="movieInfo">
                            Released: <span className="spanOpacity">{movieInfo?.data.Released}</span>
                        </span>
                            <span className="movieInfo">
                            Runtime: <span className="spanOpacity">{movieInfo?.data.Runtime}</span>
                        </span>
                            <span className="movieInfo">
                            Genre: <span className="spanOpacity">{movieInfo?.data.Genre}</span>
                        </span>
                            <span className="movieInfo">
                            Director: <span className="spanOpacity">{movieInfo?.data.Director}</span>
                        </span>
                            <span className="movieInfo">
                            Actors: <span className="spanOpacity">{movieInfo?.data.Actors}</span>
                        </span>
                            <span className="movieInfo">
                            Plot: <span className="spanOpacity">{movieInfo?.data.Plot}</span>
                        </span>
                            <div className="flex space-x-3">
                                <Button variant="contained" onClick={handleWatchedClick}>I've watched this
                                    movie</Button>
                                <Button variant="contained" onClick={handleWantToWatchClick}>I wanna watch this
                                    movie</Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <span
                        className="w-[48px] h-[48px] border-[5px] border-solid border-white border-b-blue-700 rounded-full inline-block box-border animate-spin"></span>
                )}
                <span
                    className="text-base font-bold text text-black bg-gray-500 h-fit p-2 rounded-full cursor-pointer opacity-80"
                    onClick={onClose}><CloseIcon/></span>
            </div>
        </>
    );
};

export {MovieInfo};
