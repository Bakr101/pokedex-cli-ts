import { expect, test } from "vitest";
import { PokeCache } from "./pokecache.js";


test.each([
    {
        key: "https://example.com",
        val: "testdata",
        interval: 500, // 1/2 second
    },
    {
        key: "https://example.com/path",
        val: "moretestdata",
        interval: 1000, // 1 second
    },
    {
        key: "https://example.com/path",
        val: {
            name: "Pikachu",
            type: "Electric"
        },
        interval: 500,
    },
    {
        key: "https://example.com/path",
        val: {
            name: "Pikachu",
            type: "Electric"
        },
        interval: 1000,
    },
    {
        key: "https://example.com/path",
        val: [
            {
                name: "Pikachu",
                type: "Electric",
                location: "Pallet Town",
                id: 25
            },
            {
                name: "Charizard",
                type: "Fire",
                location: "Mt. Moon",
                id: 6
            },
            {
                name: "Bulbasaur",
                type: "Grass",
                location: "Viridian City",
                id: 1
            }
        ],
        interval: 1000,
    }
])("Test Caching $interval ms", ({ key, val, interval }) => {
    const cache = new PokeCache(interval);

    cache.add(key, val);
    const cached = cache.get(key);
    expect(cached).toBe(val);


    const reaped = cache.get(key);
    expect(reaped).toBe(undefined);
    cache.stopReapLoop();
});