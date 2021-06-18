import React, { useState,useEffect} from "react";
import axios from "axios";

import PokemonCard from "./PokemonCard";

const PokemonList = (props) => {
	const [url, setUrl] = useState({
		pokemon: null,
	});

	useEffect(() => {
		const fetchData = async () => {
			let res = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=40");
			setUrl({ ...url, pokemon: res.data.results });
		}
		fetchData()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<React.Fragment>
			{url.pokemon ? (
				<div className="row">
					{url.pokemon.map(pokemon => (
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
export default PokemonList;
