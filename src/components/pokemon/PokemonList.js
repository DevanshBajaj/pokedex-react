import React, { useState,useEffect, lazy, Suspense} from "react";
import axios from "axios";
import spinner from './spinner.gif';
import styles from './PokemonList.module.css'

const PokemonCard = lazy(() => import('./PokemonCard'))


const PokemonList = (props) => {
	const [url, setUrl] = useState({
		pokemon: null,
	});
	const [filter, setFilter] = useState('')


	useEffect(() => {
		const fetchData = async () => {
			let res = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=180");
			setUrl({ ...url, pokemon: res.data.results });
		}
		fetchData()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleSearchChange = (event) => {
		setFilter(event.target.value)
	}

	return (
		<React.Fragment>
			<div className={styles.searchbox}>
				<input 
					type="text" 
					placeholder="Search name" 
					onChange={handleSearchChange}
				/>
        	</div>
			{url.pokemon ? (
				<div className="row">
					{url.pokemon.map(pokemon =>  
						pokemon.name.includes(filter) &&
						(
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
