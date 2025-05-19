import { State } from "./state.js";

export async function commandMapb(state: State): Promise<void> {
    if (!state.previousPageURL) {
        console.log("You're already at the first page!")
        return
    }
    const locations = await state.pokeapi.fetchLocations(state.previousPageURL)
    state.nextPageURL = locations.next
    state.previousPageURL = locations.previous

    for (const location of locations.results) {
        console.log(location.name)
    }
}
