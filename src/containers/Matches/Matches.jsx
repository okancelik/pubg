import React, {Component} from 'react';
import {Container, Row, Col, Form, FormGroup, Input, Button, Alert} from 'reactstrap';
import ReactTable from "react-table";
import {connect} from 'react-redux';
import moment from 'moment';

import 'react-table/react-table.css';
import * as actions from '../../store/actions/index';

moment.locale("tr");

class Matches extends Component {
	state = {
		username: ""
	}

	usernameChangeHandler = (e) => {
		this.setState({username: e.target.value});
	}

	searchUserByUsername = (e) => {
		e.preventDefault();

		this.props.searchUserByUsername(this.state.username);
	}

	render() {
		const columns = [
			{
				id: 'map',
				Header: "Harita",
				accessor: d => {
					switch (d.data.attributes.mapName) {
						case "Savage_Main":
							return "Sanhok";
						case "Desert_Main":
							return "Miramar";
						case "Erangel_Main":
							return "Erangel";
						default:
							return "TANIMLANMAYAN HARİTA";
					}
				},
			},
			{
				id: 'mod',
				Header: "Mod",
				accessor: d => {
					let gameMode = d.data.attributes.gameMode.replace("normal-", "");
					switch (gameMode) {
						case "duo":
							return "DUO TPP";
						case "duo-fpp":
							return "DUO FPP";
						case "solo":
							return "SOLO TPP";
						case "solo-fpp":
							return "SOLO FPP";
						case "squad":
							return "SQUAD TPP";
						case "squad-fpp":
							return "SQUAD FPP";
						default:
							return "NORMAL";
					}
				}
			},
			{
				id: 'date',
				Header: "Tarih",
				accessor: d => {
					return moment(d.data.attributes.createdAt).format("DD.MM.YYYY HH:mm");
				},
				sortMethod: (a, b) => {
					if (a === b) {
						return 0;
					}
					console.log(a, b);
					a = moment(a, "DD.MM.YYYY HH:mm").unix();
					b = moment(b, "DD.MM.YYYY HH:mm").unix();
					console.log(a, b);
					return a > b ? 1 : -1;
				}
			},
			{
				id: "duration",
				Header: "Süre",
				accessor: d => {
					return moment.utc(d.data.attributes.duration * 1000).format("mm:ss");
				}
			},
			{
				id: 'custom',
				Header: "Custom Game?",
				accessor: d => {
					return d.data.attributes.isCustomMatch ? "Evet" : "Hayır";
				}
			},
			{
				id: 'team',
				Header: "Takım",
				accessor: d => {
					return d.data.relationships.rosters.data.length;
				}
			},
			{
				id: "player",
				Header: "Oyuncu",
				accessor: d => {
					return d.players.length;
				}
			}

		];

		let title = "";
		if (this.props.username) {
			title = <h1>{this.props.username} Maçları</h1>;
		}

		return (
			<Container>
				<Row>
					<Col xs={12}>
						<Form inline className="usernameSearchForm" onSubmit={this.searchUserByUsername}>
							<FormGroup className="mb-2 mr-sm-2 mb-sm-0">
								<Input type="username" name="username" placeholder="Kullanıcı Adı"
								       value={this.state.username} onChange={this.usernameChangeHandler}/>
							</FormGroup>
							<Button>Ara</Button>
						</Form>
					</Col>
					<Col xs={12}>
						<Alert color="danger" isOpen={this.props.searchError !== null} toggle={this.props.closeError}>
							{this.props.searchError}
						</Alert>
					</Col>
					<Col xs={12}>
						{title}
						<ReactTable
							className="matchesTable"
							data={this.props.matches}
							columns={columns}
							defaultSorted={[
								{
									id: "date",
									desc: true
								}
							]}
						/>
					</Col>
				</Row>
			</Container>
		);
	}

}

const mapStateToProps = state => {
	return {
		userID: state.match.userID,
		searchError: state.match.error,
		matches: state.match.matches,
		username: state.match.username,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		searchUserByUsername: (username) => dispatch(actions.getMatchesByUserName(username)),
		closeError: () => dispatch(actions.closeSearchError()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Matches);