import React from 'react';
import {mergeSort} from '../SortingAlgorithms/MergeSort.js'
import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 1;   // speed of the animation
const NUMBER_OF_ARRAY_BARS = window.innerWidth / 4 - 50;   // number of bars (values) in the array
const HEIGHT_OF_ARRAY_BARS = window.innerHeight - 150;    // height of bars (values) in the array
const COLORS = {
  INITIAL: 'LightSteelBlue',
  PROCESSING: 'Red',
  PROCESSED: 'LightGreen'
}

export default class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: []
		};
    this.isSorting = false;
	}

	componentDidMount() {
		this.resetArray();
	}

	resetArray() {
    if (this.isSorting) return

		const array = [];
    const arrayBars = document.getElementsByClassName('array-bar');

    for(var i = 0; i < arrayBars.length; i++){
      arrayBars[i].style.backgroundColor = COLORS.INITIAL;
    }

		for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
			array.push(randomIntFromInterval(5, HEIGHT_OF_ARRAY_BARS));
		}
		this.setState({array});
	}

  mergeSort() {
    if (this.isSorting) return

    this.isSorting = true;
    const animations = mergeSort(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i]; 
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? COLORS.PROCESSING : COLORS.PROCESSED;

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }

    setTimeout(() => {
      this.isSorting = false;
    }, (animations.length + 1) * ANIMATION_SPEED_MS);

    // TODO add pop up window with a notification
    // const javaScriptSortedArray = this.state.array.slice().sort((a, b) => a - b);
    // const sortedArray = this.state.array;
    // console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
  }

  quickSort() {}    // TODO
  heapSort() {}   // TODO
  bubbleSort() {}   // TODO

	render() {
		const {array} = this.state;

		return (
			<div className='array-container'>
				{array.map((value, idx) => (
					<div className='array-bar' key={idx} style={{backgroundColor: COLORS.INITIAL, height: `${value}px`}}></div>
				))}
        <div>
          <button className='btn btn-gray' onClick={() => this.resetArray()}>Generate New Array</button>
          <button className='btn btn-gray' onClick={() => this.mergeSort()}>Merge Sort</button>
          <button className='btn btn-gray' onClick={() => this.quickSort()}>Quick Sort</button>
          <button className='btn btn-gray' onClick={() => this.heapSort()}>Heap Sort</button>
          <button className='btn btn-gray' onClick={() => this.bubbleSort()}>Bubble Sort</button>
        </div>
			</div>
		);
	}
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// function arraysAreEqual(firstArray, secondArray) {
//   if (firstArray.length !== secondArray.length) return false;

//   for (let i = 0; i < firstArray.length; i++) {
//     if (firstArray[i] !== secondArray[i]) return false;
//   }
  
//   return true;
// }