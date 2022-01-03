import React from 'react';
import * as sortingAlgorithms from '../SortingAlgorithms/MergeSort.js'
import './SortingVisualizer.css';


export default class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: [],
      height: props.height
		};
	}

	componentDidMount() {
		this.resetArray();
	}

	resetArray() {
		const array = [];
    const length = window.innerWidth / 4 - 50;

		for (let i = 0; i < length; i++) {
			array.push(randomIntFromInterval(5, window.innerHeight - 150));
		}
		this.setState({array});
	}

  mergeSort() {
    const javaScriptSortedArray = this.state.array.slice().sort((a, b) => a - b);
    const sortedArray = sortingAlgorithms.mergeSort(this.state.array);

    console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
  }

  quickSort() {}
  heapSort() {}
  bubbleSort() {}

  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = []
      const lenght = randomIntFromInterval(1, 1000);

      for (let j = 0; j < lenght; j++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }

      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = sortingAlgorithms.mergeSort(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
 
    }
  }

	render() {
		const {array} = this.state;

		return (
			<div className='array-container'>
				{array.map((value, idx) => (
					<div className='array-bar' key={idx} style={{height: `${value}px`}}></div>
				))}
        <div>
          <button className='btn btn-gray' onClick={() => this.resetArray()}>Generate New Array</button>
          <button className='btn btn-gray' onClick={() => this.mergeSort()}>Merge Sort</button>
          <button className='btn btn-gray' onClick={() => this.quickSort()}>Quick Sort</button>
          <button className='btn btn-gray' onClick={() => this.heapSort()}>Heap Sort</button>
          <button className='btn btn-gray' onClick={() => this.bubbleSort()}>Bubble Sort</button>
          <button className='btn btn-gray' onClick={() => this.testSortingAlgorithms()}>Test</button>
        </div>
			</div>
		);
	}
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(firstArray, secondArray) {
  if (firstArray.length !== secondArray.length) return false;

  for (let i = 0; i < firstArray.length; i++) {
    if (firstArray[i] !== secondArray[i]) return false;
  }
  
  return true;
}