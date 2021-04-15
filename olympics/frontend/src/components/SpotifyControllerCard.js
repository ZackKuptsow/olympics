import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export default class SpotifyControllerCard extends Component {
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
				style={{ width: '24rem', height: '24rem' }}
			>
				<Card.Title>Spotify Controller</Card.Title>
			</Card>
		);
	}
}
