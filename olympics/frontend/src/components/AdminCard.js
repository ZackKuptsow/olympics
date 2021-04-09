import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export default class AdminCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			votesToSkip: 2,
			playerCanPause: false,
			isHost: false
		};
		this.roomCode = this.props.match.params.roomCode;
		this.getRoomDetails();
	}

	getRoomDetails() {
		fetch('/api/get-room' + '?code=' + this.roomCode)
			.then(response => response.json())
			.then(data => {
				this.setState({
					votesToSkip: data.votes_to_skip,
					playerCanPause: data.player_can_pause,
					isHost: data.is_host
				});
			});
	}

	render() {
		return (
			<Card
				className="text-center p-5"
				style={{ width: '18rem', height: '18rem' }}
			>
				<h3>{this.roomCode}</h3>
				<p>Votes: {this.state.votesToSkip}</p>
				<p>Guest Can Pause: {this.state.playerCanPause.toString()}</p>
				<p>Host: {this.state.isHost.toString()}</p>
			</Card>
		);
	}
}
