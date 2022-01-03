import React from 'react';
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

		for (let i = 0; i < window.innerWidth / 4 - 50; i++) {
			array.push(randomIntFromInterval(5, window.innerHeight - 150));
		}
		this.setState({array});
	}

  mergeSort() {}
  quickSort() {}
  heapSort() {}
  bubbleSort() {}

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
        </div>
			</div>
		);
	}
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}