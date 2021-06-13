/* eslint-disable array-callback-return */
import React, { Component } from "react";
import axios from "axios";
import styles from './PokemonCard.module.css';

const typeColors = {
	normal: '65655F',
	poison: 'A2599A',
	psychic: 'FA7BB7',
	grass: '85CD4D',
	Ground: 'EFD060',
	Ice: '9BF5FF',
	fire: 'FA5442',
	rock: 'CCBC6E',
	dragon:'8574FE',
	water:'55ABFF',
	bug:'C2D121',
	dark:'9F857F',
	lighting:'A85645',
	ghost:'7670C9',
	steel:'C1C0D4',
	flying:'7AA4FF',
	electric:'FFED57',
	fairy:'F5B6FE'
};

class Pokemon extends Component {
	state = {
		name: "",
		pokemonIndex: "",
		imageUrl: "",
		types: [],
		description: "",
		stats: {
			hp: "",
			attack: "",
			defense: "",
			speed: "",
			specialAttack: "",
			specialDefense: "",
		},
		height: "",
		weight: "",
		eggGroup: "",
		abilities: "",
		genderRatioMale: "",
		genderRatioFemale: "",
		evs: "",
		hatchSteps: "",
	};

	async componentDidMount() {
		const { pokemonIndex } = this.props.match.params;

		//URLs for information
		const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
		const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

		const pokemonRes = await axios.get(pokemonUrl);

        // data

		const name = pokemonRes.data.name;
		const imageUrl = pokemonRes.data.sprites.front_default;

		let { hp, attack, defense, speed, specialAttack, specialDefense } = " ";

		pokemonRes.data.stats.map((stat) => {
			// eslint-disable-next-line default-case
			switch (stat.stat.name) {
				case "hp":
					hp = stat["base_stat"];
					break;
				case "attack":
					attack = stat["base_stat"];
					break;
				case "defense":
					defense = stat["base_stat"];
					break;
				case "speed":
					speed = stat["base_stat"];
					break;
				case "special-attack":
					specialAttack = stat["base_stat"];
					break;
				case "special-defense":
					specialDefense = stat["base_stat"];
					break;
			}
		});

		// convert decimeter to ft
		const height =
			Math.round((pokemonRes.data.height * 0.328084 + 0.0001) * 100) / 100;
		const weight = Math.round(pokemonRes.data.weight / 10);

		const types = pokemonRes.data.types.map((type) => type.type.name);
		const abilities = pokemonRes.data.abilities.map((ability) => {
			return ability.ability.name
				.toLowerCase()
				.split('-')
				.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
				.join(" ");
		});

        const evs = pokemonRes.data.stats.filter(stat => {
            if (stat.effort > 0) {
                return true;
            }
            return false;
        }).map(stat => {
            return `${stat.effort} ${stat.name}`
            .toLowerCase()
            .split('-')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
        }).join(', ');


        // description
        await axios.get(pokemonSpeciesUrl).then(res => {
            let description = ''; 
            res.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'en') {
                    description = flavor.flavor_text;
                    return;
                }
            });

            const femaleRate = res.data['gender_rate'];
            const genderRatioFemale = 12.5 * femaleRate;
            const genderRatioMale = 12.5 * (8 - femaleRate);

            const catchRate = Math.round((100/255) * res.data['capture_rate']);

            const eggGroups = res.data['egg_groups'].map(group => {
                return group.name
                .toLowerCase()
				.split('-')
				.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
				.join(" ");
            }).join(', ' )

            const hatchSteps = 255 * (res.data['hatch_counter'] + 1)

            this.setState({
                description,
                genderRatioFemale,
                genderRatioMale,
                catchRate,
                eggGroups,
                hatchSteps
            });
        });

        this.setState({
            imageUrl,
            pokemonIndex,
            name,
            types,
            stats : {
                hp,
                attack,
                defense,
                speed,
                specialAttack,
                specialDefense
            },
            height,
            weight,
            abilities,
            evs
        });

	}
	render() {
		return (
		<div className='col'>
			<div className={(styles.card, styles.disabled)}>
				<div className={styles.card_header}>
						<div className="row">
							<div className="col-5">
								<h5>{this.state.pokemonIndex}</h5>
							</div>
							<div className="col-7">
								<div className="float-end">{this.state.types.map(type => (
									<span 
										key={type}
										className="badge rounded-pill me-2"
										style={{backgroundColor: `#${typeColors[type]}`,
										color:'white'}}
										>{type.toLowerCase()
										.split('-')
										.map((s) => s.charAt(0)
										.toUpperCase() + s.substring(1))
										.join(" ")};
									</span>
								))}</div>
							</div>
						</div>
					</div>
				<div className={styles.card_body}>
					<div className="row align-items-center">
						<div className='col-md-3'>
							<img 
							src={this.state.imageUrl} 
							alt="pokemonImage"
							className="card-img-top mt-2" >
							</img>
						</div>
						<div className="col-md-9">
							<h4 className="mx-auto">{this.state.name.toLowerCase()
								.split('-')
								.map((s) => s.charAt(0)
								.toUpperCase() + s.substring(1))
								.join(" ")}
							</h4>
							<div className='row align-items-center'>
							<div className='col-12 col-md-3'>HP</div>
							<div className="col-12 col-md-9">
								<div className='progress'>
								<div className='progress-bar' vrole='progressBar'
								style={{width: `${this.state.stats.hp}%` ,backgroundColor:'rgba(206, 130, 142, 1)'}}
								aria-valuenow='25'
								aria-valuemin='0'
								aria-valuemax='100'
								><small>{this.state.stats.hp}</small></div>
								</div>
							</div>
							</div>
							<div className='row align-items-center'>
							<div className='col-12 col-md-3'>Attack</div>
							<div className="col-12 col-md-9">
								<div className='progress'>
								<div className='progress-bar' vrole='progressBar'
								style={{width: `${this.state.stats.attack}%` ,backgroundColor:'rgba(206, 130, 142, 1)'}}
								aria-valuenow='25'
								aria-valuemin='0'
								aria-valuemax='100'
								><small>{this.state.stats.attack}</small></div>
								</div>
							</div>
							</div>
							<div className='row align-items-center'>
							<div className='col-12 col-md-3'>Defense</div>
							<div className="col-12 col-md-9">
								<div className='progress'>
								<div className='progress-bar' vrole='progressBar'
								style={{width: `${this.state.stats.defense}%` ,backgroundColor:'rgba(206, 130, 142, 1)'}}
								aria-valuenow='25'
								aria-valuemin='0'
								aria-valuemax='100'
								><small>{this.state.stats.defense}</small></div>
								</div>
							</div>
							</div>
							<div className='row align-items-center'>
							<div className='col-12 col-md-3'>Speed</div>
							<div className="col-12 col-md-9">
								<div className='progress'>
								<div className='progress-bar' vrole='progressBar'
								style={{width: `${this.state.stats.speed}%` ,backgroundColor:'rgba(206, 130, 142, 1)'}}
								aria-valuenow='25'
								aria-valuemin='0'
								aria-valuemax='100'
								><small>{this.state.stats.speed}</small></div>
								</div>
							</div>
							</div>
							<div className='row align-items-center'>
							<div className='col-12 col-md-3'>Special Attack</div>
							<div className="col-12 col-md-9">
								<div className='progress'>
								<div className='progress-bar' vrole='progressBar'
								style={{width: `${this.state.stats.specialAttack}%` ,backgroundColor:'rgba(206, 130, 142, 1)'}}
								aria-valuenow='25'
								aria-valuemin='0'
								aria-valuemax='100'
								><small>{this.state.stats.specialAttack}</small></div>
								</div>
							</div>
							</div>
							<div className='row align-items-center'>
							<div className='col-12 col-md-3'>Special Defense</div>
							<div className="col-12 col-md-9">
								<div className='progress'>
								<div className='progress-bar' vrole='progressBar'
								style={{width: `${this.state.stats.specialDefense}%` ,backgroundColor:'rgba(206, 130, 142, 1)'}}
								aria-valuenow='25'
								aria-valuemin='0'
								aria-valuemax='100'
								><small>{this.state.stats.specialDefense}</small></div>
								</div>
							</div>
							</div>
						</div>
						<div className='row mt-1'>
							<div className='col'>
								<p className='p-4 text-break'><b>Description:</b><br />{this.state.description}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		);
	}
}

export default Pokemon;
