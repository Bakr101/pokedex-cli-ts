export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2/";

    constructor() { }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        if (pageURL) {
            const response = await fetch(pageURL)
            const data = await response.json()
            return data
        } else {
            const response = await fetch(PokeAPI.baseURL + "location-area/")
            const data = await response.json()
            return data
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const response = await fetch(PokeAPI.baseURL + "location-area/" + locationName)
        const data = await response.json()
        return data
    }
}

export type ShallowLocations = {
    count: number
    next?: string
    previous?: string
    results: Location[]
};

export type Location = {
    name: string
    url: string
};