import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	withRouter,
	Switch,
	Route,
	Link,
	Redirect
} from 'react-router-dom';
import { Container, Row, Col, Card, Button, Navbar } from 'react-bootstrap';
import CreatePage from './CreatePage';
import AdminPage from './AdminPage';

export default class AdminCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			votesToSkip: 2,
			playerCanPause: false,
			isHost: false,
			showSettings: false
		};
		this.roomCode = this.props.match.params.roomCode;
		this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
		this.updateShowSettings = this.updateShowSettings.bind(this);
		this.renderSettingsButton = this.renderSettingsButton.bind(this);
		this.renderSettings = this.renderSettings.bind(this);
		this.getRoomDetails = this.getRoomDetails.bind(this);
		this.getRoomDetails();
	}

	getRoomDetails() {
		fetch('/api/get-room' + '?code=' + this.roomCode)
			.then(response => {
				if (!response.ok) {
					this.props.leaveRoomCallback();
					this.props.history.push('/');
				}
				return response.json();
			})
			.then(data => {
				this.setState({
					votesToSkip: data.votes_to_skip,
					playerCanPause: data.player_can_pause,
					isHost: data.is_host
				});
			});
	}

	leaveButtonPressed() {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		};
		fetch('/api/leave-room', requestOptions).then(_response => {
			this.props.leaveRoomCallback();
			this.props.history.push('/');
		});
	}

	updateShowSettings(value) {
		this.setState({
			showSettings: value
		});
	}

	renderSettings() {
		return (
			<Container>
				<Row>
					<Col>
						<Button variant="primary" onClick={this.props.handler}>
							Settings
						</Button>
					</Col>
				</Row>
			</Container>
		);
	}

	renderSettingsButton() {
		return (
			<Container>
				<Row>
					<Col>
						<Button
							variant="primary"
							onClick={() => this.updateShowSettings(true)}
							className="m-1"
						>
							Settings
						</Button>
					</Col>
				</Row>
			</Container>
		);
	}

	render() {
		if (this.state.showSettings) {
			return this.renderSettings();
		}

		return (
			<Card
				className="text-center"
				style={{ width: '24rem', height: '24rem' }}
			>
				<Navbar className="p-3" bg="dark" variant="dark">
					<Navbar.Brand href="/">Settings</Navbar.Brand>
				</Navbar>
				<h5>Room Code: {this.roomCode}</h5>
				<p>Votes: {this.state.votesToSkip}</p>
				<p>Player Can Pause: {this.state.playerCanPause.toString()}</p>
				<p>Host: {this.state.isHost.toString()}</p>
				{this.state.isHost ? this.renderSettingsButton() : null}
				<Button
					variant="danger"
					className="mx-auto"
					style={{ width: '50%' }}
					onClick={this.leaveButtonPressed}
				>
					Leave Room
				</Button>
			</Card>
		);
	}
}
