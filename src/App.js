import React, { Component } from 'react';

import InfiniteScroll from './InfiniteScroll';

import logo from './logo.svg';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React Infinite Scroll Waypoint</h1>
				</header>
				<section className="App-intro">
					<InfiniteScroll
						scrollElementName="App-intro"
						loading={false}
						currentPage={1}
						clickToUpdate={false}
						hasMore={true}
						onUpdate={() => console.log('func 22')}
					>
						<div>
							<p>hello</p>
							<p>hello</p>
							<p>hello</p>
							<p>hello</p>
							<p>hello</p>
							<p>hello</p>
							<p>hello</p>
							<p>hello</p>
						</div>
					</InfiniteScroll>
				</section>
			</div>
		);
	}
}

export default App;
