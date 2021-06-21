import React, { useState,useEffect, lazy, Suspense} from "react";
import axios from "axios";
import spinner from './spinner.gif';


const PokemonCard = lazy(() => import('./PokemonCard'))


const PokemonList = (props) => {
	const [url, setUrl] = useState({
		pokemon: null,
	});

	useEffect(() => {
		const fetchData = async () => {
			let res = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=60");
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
						<Suspense key={Math.random().toString()} fallback={<h1 style={{color: 'rgb(224, 117, 133)'}}>Loading List....</h1>}>
							<PokemonCard
							key={Math.random().toString()}
							name={pokemon.name}
							url={pokemon.url}
						/>
						</Suspense>
						
					))}
				</div>
			) : (
				<img src={spinner} alt='loading'></img>
			)}
		</React.Fragment>
	);
}
export default PokemonList;
