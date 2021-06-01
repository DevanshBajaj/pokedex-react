import React, { Component } from "react";
import axios from "axios";

import PokemonCard from "./PokemonCard";

class PokemonList extends Component {
	state = {
		url: "https://pokeapi.co/api/v2/pokemon/?limit=40",
		pokemon: null,
	};

	async componentDidMount() {
		const res = await axios.get(this.state.url);
		this.setState({ pokemon: res.data['results'] });
	}

	render() {
		return (
			<React.Fragment>
				{this.state.pokemon ? (
					<div className="row">
						{this.state.pokemon.map(pokemon => (
							<PokemonCard
								key={Math.random().toString()}
								name={pokemon.name}
								url={pokemon.url}
							/>
						))}
					</div>
				) : (
					<h1>Loading Pokemon!</h1>
				)}
			</React.Fragment>
		);
	}
}

export default PokemonList;
