import React, { Component } from 'react';

export default class BracketGuestView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			winnerAB: '',
			winnerCD: ''
		};
		this.event = this.props.event.event;
		this.roomCode = this.props.match.params.roomCode;
		this.getEvent();
	}

	getEvent() {
		fetch('/api/get-round-one' + '?room_code=' + this.roomCode)
			.then(response => response.json())
			.then(data => {
				for (let event in data) {
					this.setState({
						winnerAB: data[event].winner_ab,
						winnerCD: data[event].winner_cd
					});
				}
			});
	}

	render() {
		console.log(this.event);
		if (this.event.winner_ab != '' && this.event.winner_cd != '') {
			return [
				<li>Winner Match 1: {this.event.winner_ab}</li>,
				<li>Winner Match 2: {this.event.winner_cd}</li>,
				<h3>Round 2:</h3>,
				<h5>
					{this.event.winner_ab} vs. {this.event.winner_cd}
				</h5>
			];
		} else if (this.event.winner_ab != '' && this.event.winner_cd == '') {
			return [
				<li>Winner Match 1: {this.event.winner_ab}</li>,
				<li>
					{this.event.team_c} vs. {this.event.team_d}
				</li>
			];
		} else if (this.event.winner_ab == '' && this.event.winner_cd != '') {
			return [
				<li>
					{this.event.team_a} vs. {this.event.team_b}
				</li>,
				<li>Winner Match 2: {this.event.winner_cd}</li>
			];
		} else {
			return [
				<li>
					{this.event.team_a} vs. {this.event.team_b}
				</li>,
				<li>
					{this.event.team_c} vs. {this.event.team_d}
				</li>
			];
		}
	}
}
