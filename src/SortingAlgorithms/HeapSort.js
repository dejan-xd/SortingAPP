import { swap } from '../Utils/Utils.js';

export function heapSort(array) {
    if (array.length <= 1) return array;

    const animations = [];
    const auxiliaryArray = array.slice();

    // create max heap
    createMaxHeap(auxiliaryArray, animations);

    // heap sorting
    let end = auxiliaryArray.length - 1;
    while (end > 0) {
        animations.push([0, end, 'processing']);
        swap(auxiliaryArray, 0, end);
        siftDown(auxiliaryArray, 0, end, animations);
        end--;
    }

    return [animations, auxiliaryArray];
}

function createMaxHeap(array, animations) {
    let currentIndex = Math.floor(array.length / 2 - 1);    // index of middle element

    // create max heap out of all array elements passed in
    while (currentIndex >= 0) {
        siftDown(array, currentIndex, array.length, animations);
        currentIndex--;
    }
}

function siftDown(array, start, end, animations) {
    if (start >= Math.floor(end / 2)) return;

    let index, leftChild, rightChild;

    while (start < end) {
        index = start;

        leftChild = 2 * start + 1;  // left child index
        rightChild = leftChild + 1; // right child index

        if (leftChild < end && array[leftChild] > array[index]) index = leftChild;
        if (rightChild < end && array[rightChild] > array[index]) index = rightChild;
        if (index === start) return;

        animations.push([start, index, "checking"])
        swap(array, start, index);
        animations.push([start, index, "processing"])

        start = index;  // continue by using the swapped index
    }

}