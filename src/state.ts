import { createInterface, type Interface } from "node:readline"
import { stdin, stdout } from "node:process"
import { getCommands } from "./cli_commands.js"
import { PokeAPI } from "./pokeapi.js"
export type CLICommand = {
    name: string,
    description: string,
    callback: (state: State) => void
}

export type State = {
    pokeapi: PokeAPI
    commands: Record<string, CLICommand>
    readline: Interface
    nextPageURL?: string
    previousPageURL?: string
}

export function initState(): State {
    return {
        pokeapi: new PokeAPI(),
        commands: getCommands(),
        readline: createInterface({
            input: stdin,
            output: stdout,
            prompt: "pokedex > "
        }),

    }
}