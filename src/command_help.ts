import { CLICommand } from "./cli_commands.js";

export function commandHelp(commands: Record<string, CLICommand>): void {
    console.log("Welcome to the Pokedex!")
    console.log("Usage:")
    for (const command of Object.values(commands)) {
        console.log(`${command.name}: ${command.description}`)
    }
}