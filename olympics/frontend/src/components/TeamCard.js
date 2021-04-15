import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Card, Navbar } from 'react-bootstrap';
import TeamPage from './TeamPage';

export default class TeamCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isHost: false
		};
		this.roomCode = this.props.match.params.roomCode;
	}

	render() {
		return (
			<Card
				className="text-center"
				style={{ width: '24rem', height: '24rem' }}
			>
				<Navbar className="p-3" bg="dark" variant="dark">
					<Navbar.Brand href={`/room/${this.roomCode}/teams`}>
						Teams
					</Navbar.Brand>
				</Navbar>
			</Card>
		);
	}
}
