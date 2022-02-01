import { swap } from '../Utils/Utils.js';

export function bubbleSort(array) {
    if (array.length <= 1) return array;

    const animations = [];
    const auxiliaryArray = array.slice();

    let sorted = false;
    let round = 0;

    while (!sorted) {
        sorted = true;
        for (let i = 0; i < auxiliaryArray.length - 1 - round; i++) {
            // while passing through the list color pillars to yellow and the pillar which is in focus to red
            animations.push([i, i + 1, "passing"]);
            if (auxiliaryArray[i] > auxiliaryArray[i + 1]) {
                // same colloring but this time with swapping
                animations.push([i, i + 1, "swap"]);
                swap(auxiliaryArray, i, i + 1);
                sorted = false;
            }
            // collor the pillars to yellow
            animations.push([i, i + 1, "other"]);
        }
        round++;
    }

    return [animations, auxiliaryArray];
}