import { cleanInput } from "./repl";
import { describe, it, expect, test } from "vitest";

describe.each([
    {
        input: "  hello world  ",
        expected: ["hello", "world"],
    },
    {
        input: "hello world whaaaat  ",
        expected: ["hello", "world", "whaaaat"],
    },
    {
        input: "   ahmed abu bakr  ",
        expected: ["ahmed", "abu", "bakr"],
    },
    {
        input: "  ",
        expected: [],
    },
    {
        input: "  hello  ",
        expected: ["hello"],
    }
])(`cleanInput($input)`, ({ input, expected }) => {
    test(`Expected ${expected}`, () => {
        const result = cleanInput(input)
        expect(result).toHaveLength(expected.length)
        for (const i in expected) {
            expect(result[i]).toBe(expected[i])
        }
    })
})