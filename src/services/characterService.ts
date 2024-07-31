

import { Episode, fetchEpisode } from './episodeService';

export interface Location {
    name: string;
    url: string;
}

export interface Origin {
    name: string;
    url: string;
}

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: string[]; 
    url: string;
    created: string; 
    episodes?: Episode[]; 
}

export interface ApiResponse<T> {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: T[];
}

interface IQuery {
    searchParams: { status?: string; location?: string; page?: number };
}
export async function fetchCharacters({ searchParams }: IQuery): Promise<ApiResponse<Character>> {
    let url = `https://rickandmortyapi.com/api/character`
    if (searchParams) {
        url = `https://rickandmortyapi.com/api/character/?page=${searchParams.page ?? 1}&status=${searchParams.status ?? ''}`
    }
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data: ApiResponse<Character> = await res.json();

    const filteredResults = searchParams.location
        ? data.results.filter(character =>
            character.location.name.toLowerCase().includes(searchParams.location?.toLocaleLowerCase() ?? '')
        )
        : data.results;

    return {
        ...data,
        results: filteredResults
    };

}
export async function fetchCharacterEpisodes(character: Character): Promise<Character> {
    const episodes = await Promise.all(
        character.episode.map(async (url) => {
            const id = url.split('/').pop();
            if (id) {
                return fetchEpisode(Number(id));
            }
            throw new Error('Invalid episode URL');
        })
    );
    return { ...character, episodes };
}
