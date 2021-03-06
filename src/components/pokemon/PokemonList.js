import React, { useState,useEffect, lazy, Suspense} from "react";
import axios from "axios";
import styles from './PokemonList.module.css'

const PokemonCard = lazy(() => import('./PokemonCard'))


const PokemonList = (props) => {
	const [url, setUrl] = useState({
		pokemon: null,
	});
	const [filter, setFilter] = useState('')


	useEffect(() => {
		const fetchData = async () => {
			let res = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=300");
			setUrl({ ...url, pokemon: res.data.results });
		}
		fetchData()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleSearchChange = (event) => {
		event.preventDefault();
		setFilter(event.target.value.toLowerCase())
	}

	return (
		<React.Fragment>
			<div className={styles.searchbox}>
				<input
					type="text" 
					aria-label="search"
					placeholder="Search Pokemon" 
					onChange={handleSearchChange}
				/>
        	</div>
			{url.pokemon ? (
				<div className="row">
					{url.pokemon.map(pokemon =>
						pokemon.name.includes(filter) &&
						(
						<Suspense key={Math.random().toString()} fallback={<p></p>}>
							<PokemonCard
							key={Math.random().toString()}
							name={pokemon.name}
							url={pokemon.url}
							/>
						</Suspense>
					))}
				</div>
			) : (
				<h1 style={{color: 'rgb(224, 117, 133)'}}>Loading List....</h1>
			)}
		</React.Fragment>
	);
}
export default PokemonList;
