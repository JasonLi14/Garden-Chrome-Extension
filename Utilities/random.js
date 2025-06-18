// This file contains functions for randomness

export function randomInt(low=0, high=1) {
    low = Math.floor(low);
    high = Math.ceil(high);
    return Math.floor(Math.random() * (high - low + 1)) + low;
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    let j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
