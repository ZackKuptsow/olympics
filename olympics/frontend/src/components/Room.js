import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TeamCard from './TeamCard';
import BracketCard from './BracketCard';
import TableCard from './TableCard';
import SpotifyControllerCard from './SpotifyControllerCard';
import SpotifyQueueCard from './SpotifyQueueCard';
import AdminCard from './AdminCard';

export default class Room extends Component {
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
			<Container>
				<Row>
					<Col>
						<TeamCard md={4} {...this.props} />
					</Col>
					<Col>
						<BracketCard md={4} {...this.props} />
					</Col>
					<Col>
						<TableCard md={4} {...this.props} />
					</Col>
				</Row>
				<Row>
					<Col>
						<SpotifyControllerCard md={4} {...this.props} />
					</Col>
					<Col>
						<SpotifyQueueCard md={4} {...this.props} />
					</Col>
					<Col>
						<AdminCard xs={12} md={4} {...this.props} />
					</Col>
				</Row>
			</Container>
		);
	}
}
