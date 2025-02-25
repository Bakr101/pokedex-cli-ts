import { createInterface, type Interface } from "node:readline"
import { stdin, stdout } from "node:process"
import { getCommands } from "./cli_commands.js"

export type CLICommand = {
    name: string,
    description: string,
    callback: (state: State) => void
}

export type State = {
    commands: Record<string, CLICommand>
    readline: Interface
}

export function initState(): State {
    return {
        commands: getCommands(),
        readline: createInterface({
            input: stdin,
            output: stdout,
            prompt: "pokedex > "
        })
    }
}