import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

export default class SpotifyQueueCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
				<Card.Title>Spotify Queue</Card.Title>
			</Card>
		);
	}
}
