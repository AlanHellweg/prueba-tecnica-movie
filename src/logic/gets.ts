import { ApiError } from "src/interfaces/apiInterface";
import { apiKey, urlBack } from "./const";
import { GetsInterface } from "src/interfaces/getsInterfaces";

// Función para consolidar parámetros repetidos en una cadena separada por comas
const consolidateParams = (params: Record<string, string | number | boolean | string[] | null>): Record<string, string[]> => {
    const consolidatedParams: Record<string, string[]> = {};

    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            if (!consolidatedParams[key]) {
                consolidatedParams[key] = [];
            }
            consolidatedParams[key].push(...value.map(v => v.toString()));
        } else if (value !== undefined && value !== null) {
            consolidatedParams[key] = [value.toString()];
        }
    });

    return consolidatedParams;
};

export const gets: GetsInterface = {
    getPopular: async (params) => {
        const url = new URL(`${urlBack}/movie/popular`);
        if (params) {
            const consolidatedParams = consolidateParams(params);
            Object.entries(consolidatedParams).forEach(([key, values]) => {
                url.searchParams.append(key, values.join(','));
            });
        }

        const headers = new Headers();
        if (apiKey) {
            headers.append('Authorization', `Bearer ${apiKey}`);
        }

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw {
                status: response.status,
                statusText: errorData.error
            } as ApiError;
        }
        return response.json();
    },
    getDetails: async (params, movie_id) => {
        const url = new URL(`${urlBack}/movie/${movie_id}`);
        if (params) {
            const consolidatedParams = consolidateParams(params);
            Object.entries(consolidatedParams).forEach(([key, values]) => {
                url.searchParams.append(key, values.join(','));
            });
        }

        const headers = new Headers();
        if (apiKey) {
            headers.append('Authorization', `Bearer ${apiKey}`);
        }

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw {
                status: response.status,
                statusText: errorData.error
            } as ApiError;
        }
        return response.json();
    },
    getVideos: async (movie_id) => {
        const url = new URL(`${urlBack}/movie/${movie_id}/videos`);

        const headers = new Headers();
        if (apiKey) {
            headers.append('Authorization', `Bearer ${apiKey}`);
        }

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw {
                status: response.status,
                statusText: errorData.error
            } as ApiError;
        }
        return response.json();
    },
    getSearch: async (params) => {
        const url = new URL(`${urlBack}/search/movie`);
        if (params) {
            const consolidatedParams = consolidateParams(params);
            Object.entries(consolidatedParams).forEach(([key, values]) => {
                url.searchParams.append(key, values.join(','));
            });
        }

        const headers = new Headers();
        if (apiKey) {
            headers.append('Authorization', `Bearer ${apiKey}`);
        }

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw {
                status: response.status,
                statusText: errorData.error
            } as ApiError;
        }
        return response.json();
    },
};
