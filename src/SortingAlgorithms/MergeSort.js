export function mergeSort(array) {
    if (array.length <= 1) return array;

    const animations = [];
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);

    return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return;

    const middleIdx = Math.floor((startIdx + endIdx) / 2);

    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations){
    let i = startIdx;
    let j = middleIdx + 1;
    let k = startIdx;

    while (i <= middleIdx && j <= endIdx) {
        animations.push([i, j]);    // compare and push to change color
        animations.push([i, j]);    // compare and push to revert color
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // overwrite the value at index k in the original array
            // with the value at index i in the auxiliary array
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // overwrite the value at index k in the original array
            // with the value at index j in the auxiliary array
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }

    while (i <= middleIdx) {
        animations.push([i, i]);    // compare and push to change color
        animations.push([i, i]);    // compare and push to revert color
        // overwrite the value at index k in the original array
        // with the value at index i in the auxiliary array
        animations.push([k, auxiliaryArray[i]])
        mainArray[k++] = auxiliaryArray[i++];
    }

    while (j <= endIdx) {
        animations.push([j, j]);    // compare and push to change color
        animations.push([j, j]);    // compare and push to revert color
        // overwrite the value at index k in the original array
        // with the value at index j in the auxiliary array
        animations.push([k, auxiliaryArray[j]])
        mainArray[k++] = auxiliaryArray[j++];
    }
}