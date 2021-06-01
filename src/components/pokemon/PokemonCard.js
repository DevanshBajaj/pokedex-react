import React, { Component } from "react";
import styles from "./PokemonCard.module.css";
import spinner from './spinner.gif';
import styled from "styled-components";

const Sprite = styled.img`
	width: 5em;
	height: 5em;
	display: none;
	margin: 0 auto;
`;


class PokemonCard extends Component {
	state = {
		name: "",
		imageUrl: "",
		pokemonIndex: "",
	};

	componentDidMount() {
		const { name, url } = this.props;
		const pokemonIndex = url.split("/")[url.split("/").length - 2];
		const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
		this.setState({
			name,
			imageUrl,
			pokemonIndex,
			imageLoading: true,
			tooManyRequests: false,
		});
	}

	render() {
		return (
			<div className="col-md-3 col-sm-6 mb-5">
				<div className={styles.card}></div>
				<h5 className={styles.card_header}>{this.state.pokemonIndex}</h5>
				<div className={styles.card_body}>
					{this.state.imageLoading ? (
						<img
							src={spinner}
							alt="spinner"
							style={{ width: "5em", height: "5em" }}
							className="card-img-top rounded mx-auto d-block mt-2"
						></img>
					) : null}
					<Sprite
						className="card-img-top rounded mx-auto mt-2"
						src={this.state.imageUrl}
						onLoad={() => this.setState({ imageLoading: false })}
						onError={() => this.setState({ tooManyRequests: true })}
						style={
							this.state.tooManyRequests
								? { display: "none" }
								: this.state.imageLoading
								? null
								: { display: "block" }
						}
					></Sprite>
					{this.state.tooManyRequests ? (
						<h6 className="mx-auto">
							<span className='badge bg-danger rounded-pill mt-2'>Too Many Requests</span>
						</h6>
					) : null}
					<h6 className={styles.card_title}>
						{this.state.name
							.toLowerCase()
							.split(" ")
							.map(
								(letter) => letter.charAt(0).toUpperCase() + letter.substring(1)
							)
							.join(" ")}
					</h6>
				</div>
			</div>
		);
	}
}

export default PokemonCard;
