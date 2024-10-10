import { configureStore } from '@reduxjs/toolkit'
import { flagSliceReducer, moviesReducer, moviesSearchReducer } from './slices'

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        movieSearch: moviesSearchReducer,
        flag: flagSliceReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
