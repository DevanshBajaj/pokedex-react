import React, {useState,useEffect, lazy, Suspense} from "react";
import axios from "axios";
import styles from './PokemonList.module.css'
import Fuse from 'fuse.js'

const PokemonCard = lazy(() => import('./PokemonCard'))

const PokemonList = (props) => {
	const [url, setUrl] = useState({
		pokemon: null,
	});
	const [search, setSearch] = useState(null)
	const [filter, setFilter] = useState('')
	const [result, setResult] = useState('')

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		try {
			let res = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=300");
			setUrl({ ...url, pokemon: res.data.results });
			let newState = res.data.results.map(pokemon => pokemon)
			setSearch(newState)
		} catch (error) {
				console.error(error.message)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	
	
	const handleSearchChange = (event) => {
		event.preventDefault();
		setFilter(event.target.value.toLowerCase())
		const options = {
			includeScore: true,
			// equivalent to `keys: [['author', 'tags', 'value']]`
			keys: ['name', 'url']
		  }
		  
		  const fuse = new Fuse(search, options)
		  
		  setResult(fuse.search(filter))
		  console.log(result)
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
						pokemon.name.includes(result) &&
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
