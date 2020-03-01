import {
    nouns,
    adjectives
} from "./word";

export const generateSecret = () => {
    const randomNumberForNouns = Math.floor(Math.random() * nouns.length);
    const randomNumberForAdjectives = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumberForAdjectives]} ${nouns[randomNumberForNouns]}`;
}