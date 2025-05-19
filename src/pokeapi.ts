import { PokeCache } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2/";
    private cache: PokeCache;

    constructor(cacheInterval: number) {
        this.cache = new PokeCache(cacheInterval)
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        if (pageURL === "https://pokeapi.co/api/v2/location-area/?offset=0&limit=20") {
            pageURL = undefined
        }
        const url = pageURL || `${PokeAPI.baseURL}location-area/`
        const cached = this.cache.get<ShallowLocations>(url)
        if (cached) {
            console.log(`Cache hit for ${url}`)
            return cached
        }

        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Failed to fetch ${url}:response status ${response.status} - ${response.statusText}`)
            }
            const locations: ShallowLocations = await response.json()
            this.cache.add(url, locations);
            return locations;
        } catch (error) {
            throw new Error(`Error fetching locations: ${(error as Error).message}`)
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}location-area/${locationName}`
        const cached = this.cache.get<Location>(url)
        if (cached) {
            console.log(`Cache hit for pokemons in ${locationName}: ${url}`)
            return cached
        }

        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Failed to fetch ${url}:response status ${response.status} - ${response.statusText}`)
            }
            const location: Location = await response.json()
            this.cache.add(url, location)
            return location
        } catch (error) {
            throw new Error(`Error fetching location ${locationName}: ${(error as Error).message}`)
        }
    }

    getCache(): void {
        console.log("Cache:")
        this.cache.logCache()
    }
}

export type ShallowLocations = {
    count: number
    next?: string
    previous?: string
    results: {
        name: string;
        url: string;
    }[]
};

export type Location = {
    encounter_method_rates: {
        encounter_method: {
            name: string;
            url: string;
        };
        version_details: {
            rate: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
    game_index: number;
    id: number;
    location: {
        name: string;
        url: string;
    };
    name: string;
    names: {
        language: {
            name: string;
            url: string;
        };
        name: string;
    }[];
    pokemon_encounters: {
        pokemon: {
            name: string;
            url: string;
        };
        version_details: {
            encounter_details: {
                chance: number;
                condition_values: any[];
                max_level: number;
                method: {
                    name: string;
                    url: string;
                };
                min_level: number;
            }[];
            max_chance: number;
            version: {
                name: string;
                url: string;
            };
        }[];
    }[];
};