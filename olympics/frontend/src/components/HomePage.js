import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect
} from 'react-router-dom';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import JoinPage from './JoinPage';
import CreatePage from './CreatePage';
import Room from './Room';
import TeamPage from './TeamPage';

export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roomCode: null
		};
		this.clearRoomCode = this.clearRoomCode.bind(this);
	}

	async componentDidMount() {
		fetch('/api/user-in-room')
			.then(response => response.json())
			.then(data => {
				this.setState({
					roomCode: data.code
				});
			});
	}

	renderHomePage() {
		return (
			<Container>
				<Row>
					<Col>
						<h1>Olympics</h1>
					</Col>
				</Row>
				<Row>
					<ButtonGroup>
						<Link to="/join">
							<Button variant="primary">Join</Button>
						</Link>
						<Link to="/create">
							<Button variant="danger">Create</Button>
						</Link>
					</ButtonGroup>
				</Row>
			</Container>
		);
	}

	clearRoomCode() {
		this.setState({
			roomCode: null
		});
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route path="/room/:roomCode/teams" component={TeamPage} />
					<Route
						exact
						path="/"
						render={() => {
							return this.state.roomCode ? (
								<Redirect to={`/room/${this.state.roomCode}`} />
							) : (
								this.renderHomePage()
							);
						}}
					/>
					<Route path="/join" component={JoinPage} />
					<Route path="/create" component={CreatePage} />
					<Route
						path="/room/:roomCode"
						render={props => {
							return (
								<Room
									{...props}
									leaveRoomCallback={this.clearRoomCode}
								/>
							);
						}}
					/>
				</Switch>
			</Router>
		);
	}
}
