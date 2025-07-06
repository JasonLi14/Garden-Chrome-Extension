/**
 * @file Functions for random numbers.
 * @author Jason Li
 */

/**
 * Returns a random integer from low to high inclusive. 
 * @param {float} low the low end
 * @param {float} high the high end
 * @returns {int}
 */
export function randomInt(low=0, high=1) {
    low = Math.floor(low);
    high = Math.ceil(high);
    return Math.floor(Math.random() * (high - low + 1)) + low;
}

/**
 * Returns a random float from low to high inclusive. 
 * @param {float} low the low end
 * @param {float} high the high end
 * @returns {float}
 */
export function randomFloat(low=0, high=1) {
    return Math.random() * (high - low) + low;
}

/**
 * Shuffles an array
 * @param {array} array: list to be shuffled
 * @returns {array} shuffled array
 */
export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i
    let j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/** 
 * Returns either -1 or 1
 * @returns {-1 | 1}
*/
export function randomSign() {
    if (Math.random() < 0.5) {
        return -1;
    } else {
        return 1;
    }
}