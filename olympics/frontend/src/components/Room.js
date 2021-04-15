import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TeamCard from './TeamCard';
import BracketCard from './BracketCard';
import TableCard from './TableCard';
import SpotifyControllerCard from './SpotifyControllerCard';
import SpotifyQueueCard from './SpotifyQueueCard';
import AdminCard from './AdminCard';
import AdminPage from './AdminPage';

export default class Room extends Component {
	constructor(props) {
		super(props);
		this.state = {
			votesToSkip: 2,
			playerCanPause: false,
			isHost: false,
			openSettings: false
		};
		this.handler = this.handler.bind(this);
		this.roomCode = this.props.match.params.roomCode;
		this.getRoomDetails();
		this.renderCards = this.renderCards.bind(this);
	}

	handler() {
		this.setState({
			openSettings: !this.state.openSettings
		});
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

	renderCards() {
		return (
			<Container>
				<Row
					md={1}
					lg={2}
					xl={3}
					className="text-md-center justify-content-md-center justify-content-lg-between m-auto"
				>
					<Col>
						<TeamCard className="m-auto" {...this.props} />
					</Col>
					<Col>
						<BracketCard className="m-auto" {...this.props} />
					</Col>
					<Col>
						<TableCard className="m-auto" {...this.props} />
					</Col>
					<Col>
						<SpotifyControllerCard
							className="m-auto"
							{...this.props}
						/>
					</Col>
					<Col>
						<SpotifyQueueCard className="m-auto" {...this.props} />
					</Col>
					<Col>
						<AdminCard
							className="m-auto"
							{...this.props}
							handler={this.handler}
						/>
					</Col>
				</Row>
			</Container>
		);
	}

	render() {
		return (
			<Container>
				{this.state.openSettings ? (
					<AdminPage
						handler={this.handler}
						{...this.props}
						updateCallback={this.getRoomDetails}
					/>
				) : (
					this.renderCards()
				)}
			</Container>
		);
	}
}
