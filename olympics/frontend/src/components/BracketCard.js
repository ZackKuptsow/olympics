import React, { Component } from 'react';
import { Card, Navbar } from 'react-bootstrap';

export default class BracketCard extends Component {
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
					<Navbar.Brand href={`/room/${this.roomCode}/brackets`}>
						Brackets
					</Navbar.Brand>
				</Navbar>
			</Card>
		);
	}
}
