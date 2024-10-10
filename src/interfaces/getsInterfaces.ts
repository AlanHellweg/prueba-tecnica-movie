export interface Movie {
    adult?: boolean;
    backdrop_path?: string;
    genre_ids?: number[];
    id?: number;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    release_date?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
}

export interface PopularResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

interface Genre {
    id: number;
    name: string;
}

interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}

export interface DetailsResponse {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: string | null;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}


interface Result {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}

export interface VideoResponse {
    id: number;
    results: Result[];
}
export interface VideoResponse {
    id: number;
    results: Result[];
}

interface SeacrhResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface GetsInterface {
    getPopular: (params: Record<string, string>) => Promise<PopularResponse>;
    getDetails: (params: Record<string, string>, movie_id?: string) => Promise<DetailsResponse>
    getVideos: (movie_id?: string) => Promise<VideoResponse>
    getSearch: (params: Record<string, string>) => Promise<SeacrhResponse>
}
