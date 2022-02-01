import React from 'react';
import { mergeSort } from '../SortingAlgorithms/MergeSort.js';
import { quickSort } from '../SortingAlgorithms/QuickSort.js';
import { heapSort } from '../SortingAlgorithms/HeapSort.js';
import { bubbleSort } from '../SortingAlgorithms/BubbleSort.js';
import { randomIntFromInterval, arrayBarColoring, shuffle } from '../Utils/Utils.js';

import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 1;   // speed of the animation
const NUMBER_OF_ARRAY_BARS = window.innerWidth / 4 - 50;   // number of bars (values) in the array
const HEIGHT_OF_ARRAY_BARS = window.innerHeight - 150;    // height of bars (values) in the array
const COLORS = {
  INITIAL: 'SkyBlue',
  PROCESSING: 'Yellow',
  FINISHED: 'LightGreen',
  CHECKING: 'Red'
}

export default class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: []
		};
    this.isSorting = false;

    // TODO add pop up window with a notification
    // TODO check if list is already sorted
    // const javaScriptSortedArray = this.state.array.slice().sort((a, b) => a - b);
    // const sortedArray = this.state.array;
    // console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
	}

	componentDidMount() {
		this.resetArray();
	}

	resetArray() {
    if (this.isSorting) return

    arrayBarColoring('array-bar', COLORS.INITIAL)

    const array = [];
		for (let i = 0; i < NUMBER_OF_ARRAY_BARS - 1; i++) {
			array.push(randomIntFromInterval(5, HEIGHT_OF_ARRAY_BARS));
		}
    array.push(HEIGHT_OF_ARRAY_BARS);
    shuffle(array);
		this.setState({array});
	}

  mergeSort() {
    if (this.isSorting) return

    arrayBarColoring('array-bar', COLORS.INITIAL)
    this.isSorting = true;
    const animations = mergeSort(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i]; 
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? COLORS.CHECKING : COLORS.PROCESSING;
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
      arrayBarColoring('array-bar', COLORS.FINISHED)
    }, (animations.length + 1) * ANIMATION_SPEED_MS);
  }

  quickSort() {
    if (this.isSorting) return

    arrayBarColoring('array-bar', COLORS.INITIAL)
    this.isSorting = true;
    const [animations, array] = quickSort(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx] = animations[i]; 
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      if (animations[i][2] === 'color') {
        setTimeout(() => {
          barOneStyle.backgroundColor = COLORS.CHECKING;
          barTwoStyle.backgroundColor = COLORS.CHECKING;
        }, i * ANIMATION_SPEED_MS);
      } else if (animations[i][2] === 'revert') {
        setTimeout(() => {
          barOneStyle.backgroundColor = COLORS.INITIAL;
          barTwoStyle.backgroundColor = COLORS.INITIAL;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = COLORS.PROCESSING;
          barTwoStyle.backgroundColor = COLORS.PROCESSING;
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }, i * ANIMATION_SPEED_MS);
      }
    }

    setTimeout(() => {
      this.isSorting = false;
      arrayBarColoring('array-bar', COLORS.FINISHED)
      this.setState({array});
    }, (animations.length + 1) * ANIMATION_SPEED_MS);
  }

  heapSort() {
    if (this.isSorting) return

    arrayBarColoring('array-bar', COLORS.INITIAL)
    this.isSorting = true;
    const [animations, array] = heapSort(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx] = animations[i]; 
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      if (animations[i][2] === 'checking') {
        setTimeout(() => {
          barOneStyle.backgroundColor = COLORS.CHECKING;
          barTwoStyle.backgroundColor = COLORS.CHECKING;
        }, i * ANIMATION_SPEED_MS);
      } else if (animations[i][2] === 'processing') {
        setTimeout(() => {
          barOneStyle.backgroundColor = COLORS.PROCESSING;
          barTwoStyle.backgroundColor = COLORS.PROCESSING;
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = COLORS.FINISHED;
          barTwoStyle.backgroundColor = COLORS.FINISHED;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => {
      this.isSorting = false;
      arrayBarColoring('array-bar', COLORS.FINISHED)
      this.setState({array});
    }, (animations.length + 1) * ANIMATION_SPEED_MS);
  }

  bubbleSort() {
    if (this.isSorting) return

    arrayBarColoring('array-bar', COLORS.INITIAL)
    this.isSorting = true;
    const [animations, array] = bubbleSort(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx] = animations[i]; 
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      if (animations[i][2] === 'passing') {
        setTimeout(() => {
          barOneStyle.backgroundColor = COLORS.PROCESSING;
          barTwoStyle.backgroundColor = COLORS.CHECKING;
        }, i * ANIMATION_SPEED_MS);
      } else if (animations[i][2] === 'swap') {
        setTimeout(() => {
          barOneStyle.backgroundColor = COLORS.PROCESSING;
          barTwoStyle.backgroundColor = COLORS.CHECKING;
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          barOneStyle.backgroundColor = COLORS.PROCESSING;
          barTwoStyle.backgroundColor = COLORS.PROCESSING;
        }, i * ANIMATION_SPEED_MS);
      }
    }
    setTimeout(() => {
      this.isSorting = false;
      arrayBarColoring('array-bar', COLORS.FINISHED)
      this.setState({array});
    }, (animations.length + 1) * ANIMATION_SPEED_MS);
  }

	render() {
		const {array} = this.state;

		return (
			<div className='array-container'>
				{array.map((value, idx) => (
					<div className='array-bar' key={idx} style={{backgroundColor: COLORS.INITIAL, height: `${value}px`}}></div>
				))}
        <div className='btn-container'>
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