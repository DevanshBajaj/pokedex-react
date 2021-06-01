import React, { Component } from "react";

class PokemonCard extends Component {
	state = {
		name: "",
		imageUrl: "",
		pokemonIndex: "",
	};

	componentDidMount() {
		const { name, url } = this.props;
		const pokemonIndex = url.split("/")[url.split("/").length - 2];
		const imageUrl = `https://github.com/PokeAPI/sprits/blob/master/sprites/pokemon/${pokemonIndex}`;
		this.setState({
			name,
			imageUrl,
			pokemonIndex,
		});
	}

	render() {
		return (
			<div className="col-md-3 col-sm-6 mb-5">
				<div className="card"></div>
				<h5 className="card-header">{this.state.pokemonIndex}</h5>
				<div className="card-body mx-auto">
					<h6 className="card-title">
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
