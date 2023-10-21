import React, {useState} from 'react';
import {Pagination} from "@mui/material";
import {MovieCard} from "./MovieCard";
import MovieIcon from '../assets/movie-icon.svg';
import SearchIcon from '@mui/icons-material/Search';
import {MovieInfo} from "./MovieInfo";
import {useAppDispatch, useAppSelector} from "../hooks";
import {movieActions} from "../redux";
import {Animation} from "./Animation";

const MovieList = () => {

    const [searchQuery, setSearchQuery] = useState<string>('');

    const [page, setPage] = useState<number>(1);

    const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

    const {movies} = useAppSelector(state => state.movieReducer);

    const dispatch = useAppDispatch();


    const handleSearch = () => {
        dispatch(movieActions.searchMovies({query: searchQuery, page}));
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        if (newPage !== page) {
            setPage(newPage);
            handleSearch();
        }
    };

    const handleMovieSelect = (imdbID: string) => {
        setSelectedMovie(imdbID);
    };

    const closeModal = () => {
        setSelectedMovie(null);
    };

    return (
        <>
            <main className="w-full flex flex-col">
                <header
                    className="bg-black text-zinc-100 flex justify-between flex-row items-center p-4 text-2xl font-bold shadow-2xl">
                    <div className="flex flex-row items-center">
                        <img className="w-12 h-12 m-3.5 object-cover" src={MovieIcon} alt={'MovieIcon'}/>
                        Watch List
                    </div>
                    <div className="flex flex-row p-2.5 rounded-md ml-5 bg-white justify-between mr-6">
                        <input className="text-black text-base font-bold border-none outline-none ml-4" type="text"
                               placeholder="Enter here to search movies" value={searchQuery}
                               onChange={(e) => setSearchQuery(e.target.value)}/>
                        <SearchIcon className="cursor-pointer" fontSize="medium" color="primary"
                                    onClick={handleSearch}/>
                    </div>
                </header>
                {selectedMovie && <MovieInfo imdbID={selectedMovie} onClose={closeModal}/>}
                {movies.length === 0 ? (
                    <Animation/>
                ) : (
                    <section className="flex w-full items-center justify-center p-4 flex-col">
                        <div className="flex w-full  flex-wrap gap-4 top-24 items-center  mt-16">
                            {movies && movies.map(movie => <MovieCard
                                onMovieSelect={() => handleMovieSelect(movie.imdbID)} movie={movie}
                                key={movie.imdbID}/>)}
                        </div>
                        <div className="w-full flex justify-center">
                        </div>

                        <div className="w-full flex justify-center mt-2 mb-2 ">
                            <Pagination
                                count={10}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                            />
                        </div>
                    </section>
                )}
            </main>
        </>
    );
};

export {MovieList}
