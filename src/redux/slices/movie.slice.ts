import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMovieData} from "../../interfaces";
import {movieService} from "../../services";
import {AxiosError} from "axios";
import {IMovie, IMovieInfo} from "../../interfaces";

interface IState {
    movies: IMovie[] | null;
    movieInfo: IMovieInfo;
    watched: string[];
    wantToWatch: string[];
}

const initialState: IState = {
    movies: [],
    movieInfo: null,
    watched: [],
    wantToWatch: [],
}

const searchMovies = createAsyncThunk<IMovieData, { page: number; query: string }>(
    'movieSlice/searchMovies',
    async ({query, page}, {rejectWithValue}) => {
        try {
            const data = await movieService.searchMovies(query, page);
            return data
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err);
        }
    }
);

const getMovieInfo = createAsyncThunk<IMovieInfo, string>(
    'movieSlice/getMovieInfo',
    async (imdbID, {rejectWithValue}) => {
        try {
            const response = await movieService.getMovieInfo(imdbID);
            return response
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data)
        }
    }
)

const slice = createSlice({
    name: 'movieSlice',
    initialState,
    reducers: {
        addToWatched: (state, action: PayloadAction<string>) => {
            if (!state.watched.includes(action.payload)) {
                state.watched.push(action.payload);
            }
        },
        removeFromWatched: (state, action: PayloadAction<string>) => {
            state.watched = state.watched.filter(imdbID => imdbID !== action.payload);
        },
        addToWantToWatch: (state, action: PayloadAction<string>) => {
            if (!state.wantToWatch.includes(action.payload)) {
                state.wantToWatch.push(action.payload);
            }
        },
        removeFromWantToWatch: (state, action: PayloadAction<string>) => {
            state.wantToWatch = state.wantToWatch.filter(imdbID => imdbID !== action.payload);
        },
    },
    extraReducers: builder =>
        builder
            .addCase(searchMovies.fulfilled, (state, action) => {
                state.movies = action.payload.data.Search;
            })

            .addCase(getMovieInfo.fulfilled, (state, action) => {
                state.movieInfo = action.payload;
            })
});

const {reducer: movieReducer, actions} = slice;

export const {addToWatched, addToWantToWatch, removeFromWatched, removeFromWantToWatch} = slice.actions;

const movieActions = {
    ...actions,
    searchMovies,
    getMovieInfo,


}

export {movieActions, movieReducer}
