import { swap } from '../Utils/Utils.js';

export function quickSort(array) {
    if (array.length <= 1) return array;
    
    const animations = [];
    const auxiliaryArray = array.slice();
    quickSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);

    return [animations, auxiliaryArray];
}

async function quickSortHelper(array, left, right, animations) {
    if (left >= right) return;

    const index = partition(array, left, right, animations);
    await Promise.all([
        quickSortHelper(array, left, index - 1, animations),
        quickSortHelper(array, index + 1, right, animations)
    ])
}

function partition(array, left, right, animations) {
    let index = left;
    const pivot = array[right];

    for (let i = left; i < right; i++) {
        animations.push([index, i, 'color']);
        animations.push([index, i, 'revert']);
        if (array[i] <= pivot) {
            animations.push([index, i, 'swap']);
            swap(array, i, index)
            index++;
        }
    }

    animations.push([index, right]);
    animations.push([index, right]);
    animations.push([index, right]);
    
    swap(array, index, right)

    return index;
}