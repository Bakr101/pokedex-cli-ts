import { initState } from './state.js';

export function cleanInput(input: string): string[] {
    const trimmedInput = input.trim().toLowerCase()
    const splitInput = trimmedInput.split(" ")
    return splitInput.filter((word) => word !== "")
}



export async function startRepl() {
    const state = initState(1000 * 60)
    const rl = state.readline
    const commands = state.commands


    rl.prompt()

    rl.on("line", async (line: string) => {
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
            try {
                await command.callback(state)
            } catch (error) {
                console.error(error)
            }
        }

        rl.prompt()
    })
}