import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';

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

    rl.on("line", (line: string) => {
        const cleanedInput = cleanInput(line)
        if (cleanedInput.length === 0) {
            rl.prompt()
            return
        }

        console.log(`Your command was: ${cleanedInput[0]}`)
        rl.prompt()
    })

    rl.prompt()
}