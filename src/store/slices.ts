import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Movie } from 'src/interfaces/getsInterfaces'

const initialState: Movie[] = []

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addMovies: (state, action: PayloadAction<Movie[]>) => {
            state.push(...action.payload)
        },
    },
})

export const movieSearchSlice = createSlice({
    name: 'moviesSearch',
    initialState,
    reducers: {
        addMoviesSearch: (state, action: PayloadAction<Movie[]>) => {
            return action.payload
        },
    },
})

export const flagSlice = createSlice({
    name: 'flag',
    initialState: false,
    reducers: {
        setFlag: (state, action: PayloadAction<boolean>) => {
            return action.payload
        },
    },
})

export const { addMovies } = moviesSlice.actions
export const { addMoviesSearch } = movieSearchSlice.actions
export const { setFlag } = flagSlice.actions

export const moviesReducer = moviesSlice.reducer
export const moviesSearchReducer = movieSearchSlice.reducer
export const flagSliceReducer = flagSlice.reducer
