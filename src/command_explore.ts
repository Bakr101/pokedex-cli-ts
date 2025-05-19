import type { State } from "./state.js"
import type { Location } from "./pokeapi.js"
export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error("No location provided")
    }

    const locationName = args[0]
    const locationData = await state.pokeapi.fetchLocation(locationName)
    const pokemonEncounters = locationData.pokemon_encounters
    const pokemonNames = pokemonEncounters.map((encounter) => encounter.pokemon.name)

    console.log(`Found ${pokemonNames.length} pokemon in ${locationName}:`)
    for (const pokemonName of pokemonNames) {
        console.log(`${pokemonName}`)
    }
}