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

    console.log(window.innerWidth)

		for (let i = 0; i < window.innerWidth / 4 - 50; i++) {
			array.push(randomIntFromInterval(5, window.innerHeight - 100));
		}
		this.setState({array});
	}

	render() {
		const {array} = this.state;

		return (
			<div className='array-container'>
				{array.map((value, idx) => (
					<div className='array-bar' key={idx} style={{height: `${value}px`}}></div>
				))}
			</div>
		);
	}
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}