export function arrayBarColoring(className, color) {
    const arrayBars = document.getElementsByClassName(className);
  
    for(var i = 0; i < arrayBars.length; i++){
      arrayBars[i].style.backgroundColor = color;
    }
}

export function arraysAreEqual(firstArray, secondArray) {
  if (firstArray.length !== secondArray.length) return false;

  for (let i = 0; i < firstArray.length; i++) {
    if (firstArray[i] !== secondArray[i]) return false;
  }
  
  return true;
}

export function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffle(array) {
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      swap(array, currentIndex, randomIndex);
    }
    return array;
}

export function swap(array, a, b) {
    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}
