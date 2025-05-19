import { commandExit } from "./command_exit.js"
import { commandHelp } from "./command_help.js"
import { commandCache, commandMap } from "./command_map.js"
import { commandMapb } from "./command_mapb.js"
import { CLICommand } from "./state.js"


export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit
        },
        help: {
            name: "help",
            description: "Show all available commands",
            callback: commandHelp
        },
        map: {
            name: "map",
            description: "Show the map of the Pokedex",
            callback: commandMap
        },
        mapb: {
            name: "mapb",
            description: "Show the previous page of the Pokedex",
            callback: commandMapb
        },
        cache: {
            name: "cache",
            description: "Show the cache of the Pokedex",
            callback: commandCache
        }
    }
}