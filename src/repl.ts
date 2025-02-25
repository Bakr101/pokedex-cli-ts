import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';
import { getCommands } from './cli_commands.js';
import { initState } from './state.js';

export function cleanInput(input: string): string[] {
    const trimmedInput = input.trim().toLowerCase()
    const splitInput = trimmedInput.split(" ")
    return splitInput.filter((word) => word !== "")
}



export function startRepl() {
    const state = initState()
    const rl = state.readline
    const commands = state.commands
    rl.prompt()

    rl.on("line", (line: string) => {
        const cleanedInput = cleanInput(line)
        if (cleanedInput.length === 0) {
            rl.prompt()
            return
        }

        const inputCommand = cleanedInput[0]

        const command = commands[inputCommand]
        if (!command) {
            console.log(`Unknown command: ${inputCommand}`)
            rl.prompt()
            return
        } else {
            command.callback(state)
        }

        rl.prompt()
    })
}