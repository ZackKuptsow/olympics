import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	withRouter,
	Switch,
	Route,
	Link,
	Redirect
} from 'react-router-dom';
import JoinPage from './JoinPage';
import CreatePage from './CreatePage';
import Room from './Room';

export default class HomePage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/">
						<p>Home Page</p>
					</Route>
					<Route path="/join" component={JoinPage} />
					<Route path="/create" component={CreatePage} />
					<Route path="/room/:roomCode" component={Room} />
				</Switch>
			</Router>
		);
	}
}
