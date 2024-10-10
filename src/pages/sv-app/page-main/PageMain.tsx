import { gets } from '@logic/gets';
import styles from './css/PageMain.module.css';
import MovieCard from './partials/MovieCard/MovieCard';
import { useInfiniteQuery } from 'react-query';
import { Movie, PopularResponse } from 'src/interfaces/getsInterfaces';
import { ApiError } from 'src/interfaces/apiInterface';
import { useEffect, useState } from 'react';
import { useInView } from "react-intersection-observer";
import Search from '@components/Search/Search';
import { RootState } from 'src/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { addMovies } from 'src/store/slices';
import { Skeleton } from '@mui/material';
import styled from 'styled-components';

const Card = styled.div`
    width: 30%;
    height: 100%;
    @media screen and (max-width: 575px) {
        width: 95%;
    }
    @media screen and (min-width: 576px) and (max-width: 767px) {
        width: 45%;
    }
    @media screen and (min-width: 768px) and (max-width: 991px) {
        width: 45%;
    }
`;

function PageMain() {
    const movies = useSelector((state: RootState) => state.movies)
    const moviesSheach = useSelector((state: RootState) => state.movieSearch)
    const flag = useSelector((state: RootState) => state.flag)
    const dispatch = useDispatch()
    const [searchLoading, setSearchLoading] = useState(false);
    const [localMovies, setLocalMovies] = useState<Movie[] | null>()
    const {
        data: dataPopular,
        isLoading: isLoadingPopular,
        fetchNextPage: fetchNextPagePopular,
        isFetchingNextPage: isFetchingNextPagePopular
    } = useInfiniteQuery<PopularResponse, ApiError>(
        [`popularMovies`],
        ({ pageParam = '1' }) => gets.getPopular({ page: pageParam, language: 'es' }),
        {
            getNextPageParam: (lastPage) => {
                const nextPage = lastPage.page + 1;
                return nextPage <= lastPage.total_pages ? nextPage : undefined;
            },
            cacheTime: 0,
            staleTime: 0,
        },

    );

    const { ref: refViewPopular, inView: inViewPopular } = useInView();

    useEffect(() => {
        if (dataPopular?.pages) {
            const allResults = dataPopular.pages.flatMap(page => page.results);
            dispatch(addMovies(allResults));
        }
    }, [dataPopular, dispatch]);

    useEffect(() => {
        if (inViewPopular) {
            fetchNextPagePopular()
        }
    }, [inViewPopular])

    useEffect(() => {
        console.log('movies');
        console.log(movies);
        console.log('moviesSheach');
        console.log(moviesSheach);
        console.log('flag');
        console.log(flag);
    }, [movies, moviesSheach, flag])

    useEffect(() => {
        setLocalMovies(flag ? moviesSheach : movies);
    }, [movies, moviesSheach, flag]);

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    Ci<span>Nema</span>
                </div>
                <div className={styles.contSearch}>
                    <Search setLoading={setSearchLoading} />
                </div>
            </div>
            <div className={styles.contMovies}>
                {movies && !isLoadingPopular && !searchLoading ? (
                    localMovies ?
                        (
                            <>
                                {localMovies.map((element, index) => (
                                    <MovieCard key={index} movie={element} ref={localMovies.length - 15 === index && flag === false ? refViewPopular : undefined} />
                                ))}
                                {isFetchingNextPagePopular ? (
                                    <>
                                        <Card>
                                            <Skeleton variant="rounded" width='100%' height="100%" />
                                        </Card>
                                        <Card>
                                            <Skeleton variant="rounded" width='100%' height="100%" />
                                        </Card>
                                        <Card>
                                            <Skeleton variant="rounded" width='100%' height="100%" />
                                        </Card>
                                    </>
                                ) : ''}
                            </>
                        ) : (
                            <>
                                No hay Peliculas
                            </>
                        )
                ) : (
                    <>
                        <Card>
                            <Skeleton variant="rounded" width='100%' height="100%" />
                        </Card>
                        <Card>
                            <Skeleton variant="rounded" width='100%' height="100%" />
                        </Card>
                        <Card>
                            <Skeleton variant="rounded" width='100%' height="100%" />
                        </Card>
                    </>
                )}
            </div>
        </div>
    );
}

export default PageMain;
