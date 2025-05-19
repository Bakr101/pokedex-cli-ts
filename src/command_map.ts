import { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
    const locations = await state.pokeapi.fetchLocations(state.nextPageURL)
    state.nextPageURL = locations.next
    state.previousPageURL = locations.previous

    for (const location of locations.results) {
        console.log(location.name)
    }
}

export async function commandCache(state: State): Promise<void> {
    state.pokeapi.getCache()


}