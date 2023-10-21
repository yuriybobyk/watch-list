import React, {FC} from 'react';
import {IMovie} from "../interfaces";
import {useAppSelector} from "../hooks";
import CheckIcon from '@mui/icons-material/Check';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface IProps {
    movie: IMovie,
    onMovieSelect: (imdbID: string) => void;
}

const MovieCard: FC<IProps> = ({movie, onMovieSelect}) => {

    const {Title, Year, Poster, Type, imdbID} = movie;

    const {watched, wantToWatch} = useAppSelector(state => state.movieReducer);

    const isWatched = watched.includes(imdbID);
    const isWantToWatch = wantToWatch.includes(imdbID);

    return (
        <>
            <div className="flex w-[360px] h-[650px] flex-col shadow-md p-2 cursor-pointer "
                 onClick={() => {
                     onMovieSelect(imdbID);
                     window.scrollTo({top: 0, behavior: "smooth"});
                 }}>
                <img className="rounded-sm object-cover w-80 h-[462px] inset-0 w-full h-full md:rounded" src={Poster}
                     alt={Title}/>
                <span className="text-lg font-semibold text-black my-4 truncate">{Title}</span>
                <div className="flex flex-row justify-between">
                    <span className="shortInfo">Year: {Year}</span>
                    <span className="shortInfo">Type: {Type}</span>
                </div>
                <div>
                    {isWatched && <CheckIcon color="success"/>}
                    {isWantToWatch && <FavoriteIcon color="error"/>}
                </div>
            </div>
        </>
    );
};

export {MovieCard}
