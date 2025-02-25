import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import { getCommands } from './cli_commands.js';
export function cleanInput(input: string): string[] {
    const trimmedInput = input.trim().toLowerCase()
    const splitInput = trimmedInput.split(" ")
    return splitInput.filter((word) => word !== "")
}



export function startRepl() {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: "pokedex > "
    })
    rl.prompt()

    rl.on("line", (line: string) => {
        const cleanedInput = cleanInput(line)
        if (cleanedInput.length === 0) {
            rl.prompt()
            return
        }

        const inputCommand = cleanedInput[0]
        const commands = getCommands()

        const command = commands[inputCommand]
        if (!command) {
            console.log(`Unknown command: ${inputCommand}`)
            rl.prompt()
            return
        } else {
            command.callback(commands)
        }

        rl.prompt()
    })
}